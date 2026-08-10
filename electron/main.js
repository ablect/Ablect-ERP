import fs from "node:fs/promises";
import path from "node:path";
import { app, BrowserWindow, dialog, ipcMain, screen } from "electron";
import { createDatabasePool, testDatabaseConnection } from "./database/db.js";
import { runMigrations } from "./database/migrate.js";
import { createErpRepository } from "./database/erp-repository.js";
import { createAuthRepository } from "./database/auth-repository.js";
import { createProcurementRepository } from "./database/procurement-repository.js";
import { createPayrollRepository } from "./database/payroll-repository.js";
import { createSettingsRepository } from "./database/settings-repository.js";
import { loadClientConfig, resolveClientLogoPath } from "./config/client-config.js";

let clientConfig;
let databasePool;
let erpRepository;
let authRepository;
let procurementRepository;
let payrollRepository;
let settingsRepository;
let mainWindow;
let databaseStatus = { connected: false, error: null };

async function buildClientConfigPayload() {
  if (!clientConfig) return { businessName: "Ablect Business Suite", installationDate: "", logoPath: null, logoDataUrl: null, configPath: null };
  const logoPath = resolveClientLogoPath(clientConfig, app.getPath("userData"));
  let logoDataUrl = null;
  if (logoPath) {
    try {
      const image = await fs.readFile(logoPath);
      const extension = path.extname(logoPath).toLowerCase();
      const mime = extension === ".svg" ? "image/svg+xml" : extension === ".webp" ? "image/webp" : extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : "image/png";
      logoDataUrl = `data:${mime};base64,${image.toString("base64")}`;
    } catch {}
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
  if (!databaseStatus.connected || !repository) throw new Error(`Database is unavailable${databaseStatus.error ? `: ${databaseStatus.error}` : "."}`);
  return repository;
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
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @page{margin:0}body{font-family:Arial,sans-serif;width:${payload?.receiptWidth === "58mm" ? "58mm" : "80mm"};margin:0;padding:5mm;color:#111;font-size:11px}h1{font-size:17px;text-align:center;margin:0 0 3px}p{margin:2px 0}.muted{color:#666;font-size:9px}.line{border-top:1px dashed #777;margin:7px 0}table{width:100%;border-collapse:collapse}td{padding:3px 0;vertical-align:top}.qty{width:24%;text-align:center}.price{width:22%;text-align:right}.total{font-size:15px;font-weight:800}.center{text-align:center}.footer{margin-top:10px;text-align:center;font-size:9px;white-space:pre-wrap}
  </style></head><body><h1>${escapeHtml(payload?.businessName || "Ablect Business Suite")}</h1><p class="center muted">${escapeHtml(payload?.invoiceNumber || "Receipt")}</p><p class="center muted">${escapeHtml(payload?.date || new Date().toLocaleString("en-NG"))}</p><div class="line"></div><p><b>Customer:</b> ${escapeHtml(payload?.customerName || "Walk-in")}</p><div class="line"></div><table><tbody>${rows}</tbody></table><div class="line"></div><p><b>Subtotal</b><span style="float:right">${money(payload?.subtotal)}</span></p><p><b>Discount</b><span style="float:right">-${money(payload?.discount)}</span></p><p><b>Tax</b><span style="float:right">${money(payload?.tax)}</span></p><p class="total">TOTAL <span style="float:right">${money(payload?.total)}</span></p><p>Paid <span style="float:right">${money(payload?.paid)}</span></p><p>Change <span style="float:right">${money(payload?.change)}</span></p><div class="line"></div><p><b>Payment:</b> ${escapeHtml(payload?.paymentMethod || "Cash")}</p><p class="footer">${escapeHtml(payload?.footer || "Thank you for your patronage.")}</p></body></html>`;
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
  const html = receiptHtml(payload);
  const receiptWindow = await createReceiptWindow(html);
  const printerName = String(payload?.printerName || "").trim();
  return new Promise((resolve, reject) => {
    receiptWindow.webContents.print({
      silent: Boolean(printerName),
      deviceName: printerName || undefined,
      printBackground: true,
      margins: { marginType: "none" },
      copies: 1,
    }, (success, failureReason) => {
      receiptWindow.destroy();
      if (success) resolve({ printed: true, printerName: printerName || "system dialog" });
      else reject(new Error(failureReason || "Receipt printing was cancelled or failed."));
    });
  });
}

async function exportReceiptPdf(payload) {
  const html = receiptHtml(payload);
  const receiptWindow = await createReceiptWindow(html);
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
  ipcMain.handle("client-config:get", buildClientConfigPayload);
  ipcMain.handle("database:status", () => databaseStatus);
  ipcMain.handle("auth:login", (_event, identifier, password) => requireDatabase(authRepository).login(identifier, password));
  ipcMain.handle("auth:validate", (_event, token) => requireDatabase(authRepository).validateSession(token));
  ipcMain.handle("auth:logout", (_event, token) => requireDatabase(authRepository).logout(token));
  ipcMain.handle("erp:products:list", (_event, search = "") => requireDatabase(erpRepository).listProducts(search));
  ipcMain.handle("erp:products:create", (_event, payload) => requireDatabase(erpRepository).createProduct(payload));
  ipcMain.handle("erp:products:update", (_event, payload) => requireDatabase(erpRepository).updateProduct(payload));
  ipcMain.handle("erp:products:delete", (_event, id) => requireDatabase(erpRepository).deleteProduct(id));
  ipcMain.handle("erp:units:list", () => requireDatabase(erpRepository).listUnitTypes());
  ipcMain.handle("erp:customers:list", (_event, search = "") => requireDatabase(erpRepository).listCustomers(search));
  ipcMain.handle("erp:customers:create", (_event, payload) => requireDatabase(erpRepository).createCustomer(payload));
  ipcMain.handle("erp:customers:update", (_event, payload) => requireDatabase(erpRepository).updateCustomer(payload));
  ipcMain.handle("erp:customers:delete", (_event, id) => requireDatabase(erpRepository).deleteCustomer(id));
  ipcMain.handle("erp:suppliers:list", (_event, search = "") => requireDatabase(erpRepository).listSuppliers(search));
  ipcMain.handle("erp:suppliers:create", (_event, payload) => requireDatabase(procurementRepository).createSupplier(payload));
  ipcMain.handle("erp:warehouses:list", () => requireDatabase(erpRepository).listWarehouses());
  ipcMain.handle("erp:warehouses:create", (_event, payload) => requireDatabase(procurementRepository).createWarehouse(payload));
  ipcMain.handle("erp:dashboard:metrics", () => requireDatabase(erpRepository).getDashboardMetrics());
  ipcMain.handle("erp:sales:list", () => requireDatabase(erpRepository).listSales());
  ipcMain.handle("erp:sales:create", (_event, payload) => requireDatabase(erpRepository).createSale(payload));
  ipcMain.handle("erp:purchases:list", () => requireDatabase(erpRepository).listPurchaseOrders());
  ipcMain.handle("erp:purchases:create", (_event, payload) => requireDatabase(procurementRepository).createPurchaseOrder(payload));
  ipcMain.handle("erp:purchases:receive", (_event, payload) => requireDatabase(erpRepository).receivePurchaseOrder(payload));
  ipcMain.handle("erp:stock:transfer", (_event, payload) => requireDatabase(erpRepository).transferStock(payload));
  ipcMain.handle("erp:stock:movements", () => requireDatabase(erpRepository).listStockMovements());
  ipcMain.handle("erp:stock:reserve", (_event, payload) => requireDatabase(erpRepository).reserveStock(payload));
  ipcMain.handle("erp:stock:release", (_event, payload) => requireDatabase(erpRepository).releaseStock(payload));
  ipcMain.handle("erp:crm:opportunities", () => requireDatabase(erpRepository).listOpportunities());
  ipcMain.handle("erp:crm:activities", () => requireDatabase(erpRepository).listActivities());
  ipcMain.handle("erp:hr:employees", () => requireDatabase(erpRepository).listEmployees());
  ipcMain.handle("erp:hr:attendance", () => requireDatabase(erpRepository).listAttendance());
  ipcMain.handle("erp:payroll:runs", () => requireDatabase(payrollRepository).listPayrollRuns());
  ipcMain.handle("erp:payroll:calculate", (_event, payload) => requireDatabase(payrollRepository).calculateRun(payload));
  ipcMain.handle("erp:admin:users", () => requireDatabase(erpRepository).listUsers());
  ipcMain.handle("erp:admin:roles", () => requireDatabase(erpRepository).listRoles());
  ipcMain.handle("erp:admin:audit-logs", () => requireDatabase(erpRepository).listAuditLogs());
  ipcMain.handle("erp:reports:summary", (_event, from, to) => requireDatabase(erpRepository).getReportSummary(from, to));
  ipcMain.handle("settings:all", () => requireDatabase(settingsRepository).getAll());
  ipcMain.handle("settings:get", (_event, key) => requireDatabase(settingsRepository).get(key));
  ipcMain.handle("settings:save", (_event, key, value, userId) => requireDatabase(settingsRepository).save(key, value, userId));
  ipcMain.handle("hardware:printers:list", () => listPrinters());
  ipcMain.handle("hardware:receipt:print", (_event, payload) => printReceipt(payload));
  ipcMain.handle("hardware:receipt:pdf", (_event, payload) => exportReceiptPdf(payload));
}

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width: workWidth, height: workHeight } = display.workAreaSize;
  const width = Math.max(960, Math.min(1440, Math.floor(workWidth * 0.92)));
  const height = Math.max(640, Math.min(900, Math.floor(workHeight * 0.9)));
  mainWindow = new BrowserWindow({ width, height, minWidth: 900, minHeight: 620, resizable: true, maximizable: true, autoHideMenuBar: true, backgroundColor: "#f5f7fb", webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(app.getAppPath(), "electron", "preload-erp.cjs") } });
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => { mainWindow = null; });
}

async function initializeLocalRuntime() {
  try {
    clientConfig = loadClientConfig(app.getPath("userData"));
    databasePool = createDatabasePool({ host: clientConfig.DATABASE.HOST, port: clientConfig.DATABASE.PORT, user: clientConfig.DATABASE.USER, password: clientConfig.DATABASE.PASSWORD, database: clientConfig.DATABASE.NAME, connectionLimit: clientConfig.DATABASE.CONNECTION_LIMIT });
    erpRepository = createErpRepository(databasePool);
    authRepository = createAuthRepository(databasePool);
    procurementRepository = createProcurementRepository(databasePool);
    payrollRepository = createPayrollRepository(databasePool);
    settingsRepository = createSettingsRepository(databasePool);
    await testDatabaseConnection(databasePool);
    await runMigrations(databasePool, app.getAppPath());
    await syncInstallationSettings();
    await authRepository.cleanupSessions();
    databaseStatus = { connected: true, error: null };
    console.log(`MySQL connected: ${clientConfig.DATABASE.HOST}:${clientConfig.DATABASE.PORT}/${clientConfig.DATABASE.NAME}`);
    return true;
  } catch (error) {
    databaseStatus = { connected: false, error: error instanceof Error ? error.message : String(error) };
    console.error("MySQL initialization failed:", databaseStatus.error);
    return false;
  }
}

app.whenReady().then(async () => { await initializeLocalRuntime(); registerIpcHandlers(); createWindow(); }).catch((error) => console.error("Electron startup failed:", error instanceof Error ? error.stack ?? error.message : error));
app.on("window-all-closed", () => { if (databasePool) databasePool.end().catch(() => undefined); if (process.platform !== "darwin") app.quit(); });
