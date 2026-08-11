import fs from "node:fs/promises";
import path from "node:path";
import { app, BrowserWindow, dialog, ipcMain, screen } from "electron";
import { ensureDatabaseExists, createDatabasePool, testDatabaseConnection } from "./database/db.js";
import { runMigrations } from "./database/migrate.js";
import { createErpRepository } from "./database/erp-repository.js";
import { createPosRepository } from "./database/pos-repository.js";
import { createSalesService } from "./database/sales-service.js";
import { createAuthRepository } from "./database/auth-repository.js";
import { createProcurementRepository } from "./database/procurement-repository.js";
import { createPayrollRepository } from "./database/payroll-repository.js";
import { createSettingsRepository } from "./database/settings-repository.js";
import { loadClientConfig, resolveClientLogoPath } from "./config/client-config.js";
import { initializeLogging } from "./logging.js";
import { registerSecurityIpc } from "./security/register-security.js";

let clientConfig;
let databasePool;
let erpRepository;
let posRepository;
let salesService;
let authRepository;
let procurementRepository;
let payrollRepository;
let settingsRepository;
let logger;
let mainWindow;
let databaseStatus = { connected: false, error: null };

async function buildClientConfigPayload() {
  if (!clientConfig) {
    return { businessName: "Ablect Business Suite", installationDate: "", logoPath: null, logoDataUrl: null, configPath: null };
  }
  const logoPath = resolveClientLogoPath(clientConfig, app.getPath("userData"));
  let logoDataUrl = null;
  if (logoPath) {
    try {
      const image = await fs.readFile(logoPath);
      const extension = path.extname(logoPath).toLowerCase();
      const mime = extension === ".svg" ? "image/svg+xml" : extension === ".webp" ? "image/webp" : extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : "image/png";
      logoDataUrl = `data:${mime};base64,${image.toString("base64")}`;
    } catch (error) {
      logger?.error("Unable to load client logo", { error: String(error) });
    }
  }
  return { businessName: clientConfig.CLIENT_BUSINESS_NAME, installationDate: clientConfig.INSTALLATION_DATE, logoPath, logoDataUrl, configPath: clientConfig.CONFIG_PATH };
}

async function syncInstallationSettings() {
  await databasePool.query(
    `INSERT INTO client_settings (id,business_name,logo_path,installation_date) VALUES (1,?,?,?) ON DUPLICATE KEY UPDATE business_name=VALUES(business_name),logo_path=VALUES(logo_path),installation_date=VALUES(installation_date)`,
    [clientConfig.CLIENT_BUSINESS_NAME, clientConfig.CLIENT_LOGO_PATH || null, clientConfig.INSTALLATION_DATE || new Date().toISOString().slice(0, 10)],
  );
}

function requireDatabase(repository) {
  if (!databaseStatus.connected || !repository) {
    throw new Error(`Database is unavailable${databaseStatus.error ? `: ${databaseStatus.error}` : "."}`);
  }
  return repository;
}

function safeHandle(channel, handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    try {
      return await handler(event, ...args);
    } catch (error) {
      logger?.error(`IPC failure: ${channel}`, { error: error instanceof Error ? error.stack : String(error) });
      throw error;
    }
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[character]));
}

function money(value) {
  return `₦${Number(value || 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function receiptHtml(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  const rows = items.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td class="qty">${escapeHtml(item.quantity)} ${escapeHtml(item.unit || "PCS")}</td><td class="price">${money(item.unitPrice)}</td><td class="price">${money(Number(item.quantity) * Number(item.unitPrice))}</td></tr>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>@page{margin:0}body{font-family:Arial,sans-serif;width:${payload?.receiptWidth === "58mm" ? "58mm" : "80mm"};margin:0;padding:5mm;color:#111;font-size:11px}h1{font-size:17px;text-align:center;margin:0 0 3px}p{margin:2px 0}.muted{color:#666;font-size:9px}.line{border-top:1px dashed #777;margin:7px 0}table{width:100%;border-collapse:collapse}td{padding:3px 0;vertical-align:top}.qty{width:24%;text-align:center}.price{width:22%;text-align:right}.total{font-size:15px;font-weight:800}.center{text-align:center}.footer{margin-top:10px;text-align:center;font-size:9px;white-space:pre-wrap}</style></head><body><h1>${escapeHtml(payload?.businessName || "Ablect Business Suite")}</h1><p class="center muted">${escapeHtml(payload?.invoiceNumber || "Receipt")}</p><p class="center muted">${escapeHtml(payload?.date || new Date().toLocaleString("en-NG"))}</p><div class="line"></div><p><b>Customer:</b> ${escapeHtml(payload?.customerName || "Walk-in")}</p><div class="line"></div><table><tbody>${rows}</tbody></table><div class="line"></div><p><b>Subtotal</b><span style="float:right">${money(payload?.subtotal)}</span></p><p><b>Discount</b><span style="float:right">-${money(payload?.discount)}</span></p><p><b>Tax</b><span style="float:right">${money(payload?.tax)}</span></p><p class="total">TOTAL <span style="float:right">${money(payload?.total)}</span></p><p>Paid <span style="float:right">${money(payload?.paid)}</span></p><p>Change <span style="float:right">${money(payload?.change)}</span></p><div class="line"></div><p><b>Payment:</b> ${escapeHtml(payload?.paymentMethod || "Cash")}</p><p class="footer">${escapeHtml(payload?.footer || "Thank you for your patronage.")}\nPowered By Able Business Suite · ABLECT TECHNOLOGIES LTD</p></body></html>`;
}

async function createReceiptWindow(html) {
  const receiptWindow = new BrowserWindow({ show: false, width: 500, height: 900, webPreferences: { sandbox: true } });
  await receiptWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  return receiptWindow;
}

async function listPrinters() {
  if (!mainWindow || mainWindow.isDestroyed()) return [];
  const printers = await mainWindow.webContents.getPrintersAsync();
  return printers.map((printer) => ({ name: printer.name, displayName: printer.displayName, description: printer.description, status: printer.status, isDefault: printer.isDefault }));
}

async function printReceipt(payload) {
  const receiptWindow = await createReceiptWindow(receiptHtml(payload));
  const printerName = String(payload?.printerName || "").trim();
  return new Promise((resolve, reject) => {
    receiptWindow.webContents.print({ silent: Boolean(printerName), deviceName: printerName || undefined, printBackground: true, margins: { marginType: "none" }, copies: 1 }, (success, failureReason) => {
      receiptWindow.destroy();
      if (success) resolve({ printed: true, printerName: printerName || "system dialog" });
      else reject(new Error(failureReason || "Receipt printing was cancelled or failed."));
    });
  });
}

async function exportReceiptPdf(payload) {
  const receiptWindow = await createReceiptWindow(receiptHtml(payload));
  try {
    const pdf = await receiptWindow.webContents.printToPDF({ printBackground: true, pageSize: { width: payload?.receiptWidth === "58mm" ? 58000 : 80000, height: 220000 } });
    const defaultName = `${payload?.invoiceNumber || "receipt"}.pdf`;
    const result = await dialog.showSaveDialog(mainWindow, { title: "Save receipt PDF", defaultPath: path.join(app.getPath("documents"), defaultName), filters: [{ name: "PDF", extensions: ["pdf"] }] });
    if (result.canceled || !result.filePath) return { saved: false };
    await fs.writeFile(result.filePath, pdf);
    return { saved: true, filePath: result.filePath };
  } finally {
    receiptWindow.destroy();
  }
}

function registerIpcHandlers() {
  safeHandle("client-config:get", buildClientConfigPayload);
  safeHandle("database:status", () => databaseStatus);
  safeHandle("auth:login", (_event, identifier, password) => requireDatabase(authRepository).login(identifier, password));
  safeHandle("auth:validate", (_event, token) => requireDatabase(authRepository).validateSession(token));
  safeHandle("auth:logout", (_event, token) => requireDatabase(authRepository).logout(token));
  safeHandle("erp:products:list", (_event, search = "") => requireDatabase(posRepository).listProducts(search));
  safeHandle("erp:products:create", (_event, payload) => requireDatabase(posRepository).createProduct(payload));
  safeHandle("erp:products:update", (_event, payload) => requireDatabase(posRepository).updateProduct(payload));
  safeHandle("erp:products:delete", (_event, id) => requireDatabase(posRepository).deleteProduct(id));
  safeHandle("erp:units:list", () => requireDatabase(posRepository).listUnitTypes());
  safeHandle("erp:customers:list", (_event, search = "") => requireDatabase(erpRepository).listCustomers(search));
  safeHandle("erp:customers:create", (_event, payload) => requireDatabase(erpRepository).createCustomer(payload));
  safeHandle("erp:customers:update", (_event, payload) => requireDatabase(erpRepository).updateCustomer(payload));
  safeHandle("erp:customers:delete", (_event, id) => requireDatabase(erpRepository).deleteCustomer(id));
  safeHandle("erp:suppliers:list", (_event, search = "") => requireDatabase(erpRepository).listSuppliers(search));
  safeHandle("erp:suppliers:create", (_event, payload) => requireDatabase(procurementRepository).createSupplier(payload));
  safeHandle("erp:warehouses:list", () => requireDatabase(erpRepository).listWarehouses());
  safeHandle("erp:warehouses:create", (_event, payload) => requireDatabase(procurementRepository).createWarehouse(payload));
  safeHandle("erp:dashboard:metrics", () => requireDatabase(erpRepository).getDashboardMetrics());
  safeHandle("erp:sales:list", () => requireDatabase(erpRepository).listSales());
  safeHandle("erp:sales:create", (_event, payload) => requireDatabase(salesService).createSale(payload));
  safeHandle("erp:purchases:list", () => requireDatabase(erpRepository).listPurchaseOrders());
  safeHandle("erp:purchases:create", (_event, payload) => requireDatabase(procurementRepository).createPurchaseOrder(payload));
  safeHandle("erp:purchases:receive", (_event, payload) => requireDatabase(erpRepository).receivePurchaseOrder(payload));
  safeHandle("erp:stock:transfer", (_event, payload) => requireDatabase(erpRepository).transferStock(payload));
  safeHandle("erp:stock:movements", () => requireDatabase(erpRepository).listStockMovements());
  safeHandle("erp:stock:reserve", (_event, payload) => requireDatabase(erpRepository).reserveStock(payload));
  safeHandle("erp:stock:release", (_event, payload) => requireDatabase(erpRepository).releaseStock(payload));
  safeHandle("erp:crm:opportunities", () => requireDatabase(erpRepository).listOpportunities());
  safeHandle("erp:crm:activities", () => requireDatabase(erpRepository).listActivities());
  safeHandle("erp:hr:employees", () => requireDatabase(erpRepository).listEmployees());
  safeHandle("erp:hr:attendance", () => requireDatabase(erpRepository).listAttendance());
  safeHandle("erp:payroll:runs", () => requireDatabase(payrollRepository).listPayrollRuns());
  safeHandle("erp:payroll:calculate", (_event, payload) => requireDatabase(payrollRepository).calculateRun(payload));
  safeHandle("erp:admin:users", () => requireDatabase(erpRepository).listUsers());
  safeHandle("erp:admin:roles", () => requireDatabase(erpRepository).listRoles());
  safeHandle("erp:admin:audit-logs", () => requireDatabase(erpRepository).listAuditLogs());
  safeHandle("erp:reports:summary", (_event, from, to) => requireDatabase(erpRepository).getReportSummary(from, to));
  safeHandle("settings:all", () => requireDatabase(settingsRepository).getAll());
  safeHandle("settings:get", (_event, key) => requireDatabase(settingsRepository).get(key));
  safeHandle("settings:save", (_event, key, value, userId) => requireDatabase(settingsRepository).save(key, value, userId));
  safeHandle("hardware:printers:list", () => listPrinters());
  safeHandle("hardware:receipt:print", (_event, payload) => printReceipt(payload));
  safeHandle("hardware:receipt:pdf", (_event, payload) => exportReceiptPdf(payload));
}

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width: workWidth, height: workHeight } = display.workAreaSize;
  const width = Math.max(960, Math.min(1440, Math.floor(workWidth * 0.92)));
  const height = Math.max(640, Math.min(900, Math.floor(workHeight * 0.9)));
  mainWindow = new BrowserWindow({ width, height, minWidth: 900, minHeight: 620, resizable: true, maximizable: true, autoHideMenuBar: true, backgroundColor: "#f5f7fb", webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(app.getAppPath(), "electron", "preload-erp.cjs") } });
  if (app.isPackaged) mainWindow.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
  else mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => { mainWindow = null; });
}

async function initializeLocalRuntime() {
  try {
    clientConfig = loadClientConfig(app.getPath("userData"));
    const dbConfig = { host: clientConfig.DATABASE.HOST, port: clientConfig.DATABASE.PORT, user: clientConfig.DATABASE.USER, password: clientConfig.DATABASE.PASSWORD, adminUser: clientConfig.DATABASE.ADMIN_USER, adminPassword: clientConfig.DATABASE.ADMIN_PASSWORD, database: clientConfig.DATABASE.NAME, connectionLimit: clientConfig.DATABASE.CONNECTION_LIMIT };
    await ensureDatabaseExists(dbConfig);
    databasePool = createDatabasePool(dbConfig);
    erpRepository = createErpRepository(databasePool);
    posRepository = createPosRepository(databasePool);
    salesService = createSalesService(databasePool);
    authRepository = createAuthRepository(databasePool);
    procurementRepository = createProcurementRepository(databasePool);
    payrollRepository = createPayrollRepository(databasePool);
    settingsRepository = createSettingsRepository(databasePool);
    await testDatabaseConnection(databasePool);
    await runMigrations(databasePool, app.getAppPath());
    await syncInstallationSettings();
    await authRepository.cleanupSessions();
    databaseStatus = { connected: true, error: null };
    return true;
  } catch (error) {
    databaseStatus = { connected: false, error: error instanceof Error ? error.message : String(error) };
    logger?.error("MySQL initialization failed", { error: databaseStatus.error, stack: error instanceof Error ? error.stack : undefined });
    return false;
  }
}

app.whenReady().then(async () => {
  logger = initializeLogging();
  await initializeLocalRuntime();
  registerIpcHandlers();
  registerSecurityIpc(ipcMain, { pool: databasePool, userDataPath: app.getPath("userData"), logger });
  createWindow();
}).catch((error) => logger?.error("Electron startup failed", { error: error instanceof Error ? error.stack : String(error) }));

app.on("window-all-closed", () => {
  if (databasePool) databasePool.end().catch((error) => logger?.error("Database pool shutdown failed", { error: String(error) }));
  if (process.platform !== "darwin") app.quit();
});
