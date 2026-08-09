import fs from "node:fs/promises";
import path from "node:path";
import { app, BrowserWindow, ipcMain, screen } from "electron";
import { createDatabasePool, testDatabaseConnection } from "./database/db.js";
import { runMigrations } from "./database/migrate.js";
import { createErpRepository } from "./database/erp-repository.js";
import { createAuthRepository } from "./database/auth-repository.js";
import { createProcurementRepository } from "./database/procurement-repository.js";
import { createPayrollRepository } from "./database/payroll-repository.js";
import { loadClientConfig, resolveClientLogoPath } from "./config/client-config.js";

let clientConfig;
let databasePool;
let erpRepository;
let authRepository;
let procurementRepository;
let payrollRepository;
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
  await databasePool.query(`INSERT INTO client_settings (id,business_name,logo_path,installation_date) VALUES (1,?,?,?) ON DUPLICATE KEY UPDATE business_name=VALUES(business_name),logo_path=VALUES(logo_path),installation_date=VALUES(installation_date)`, [clientConfig.CLIENT_BUSINESS_NAME, clientConfig.CLIENT_LOGO_PATH || null, clientConfig.INSTALLATION_DATE || new Date().toISOString().slice(0, 10)]);
}

function requireDatabase(repository) {
  if (!databaseStatus.connected || !repository) throw new Error(`Database is unavailable${databaseStatus.error ? `: ${databaseStatus.error}` : "."}`);
  return repository;
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
  ipcMain.handle("erp:payroll:runs", () => requireDatabase(erpRepository).listPayrollRuns());
  ipcMain.handle("erp:payroll:calculate", (_event, payload) => requireDatabase(payrollRepository).calculateRun(payload));
  ipcMain.handle("erp:admin:users", () => requireDatabase(erpRepository).listUsers());
  ipcMain.handle("erp:admin:roles", () => requireDatabase(erpRepository).listRoles());
  ipcMain.handle("erp:admin:audit-logs", () => requireDatabase(erpRepository).listAuditLogs());
  ipcMain.handle("erp:reports:summary", (_event, from, to) => requireDatabase(erpRepository).getReportSummary(from, to));
}

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width: workWidth, height: workHeight } = display.workAreaSize;
  const width = Math.max(960, Math.min(1440, Math.floor(workWidth * 0.92)));
  const height = Math.max(640, Math.min(900, Math.floor(workHeight * 0.9)));
  const win = new BrowserWindow({
    width,
    height,
    minWidth: 900,
    minHeight: 620,
    resizable: true,
    maximizable: true,
    autoHideMenuBar: true,
    backgroundColor: "#f5f7fb",
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(app.getAppPath(), "electron", "preload-erp.cjs") },
  });
  win.setAspectRatio(16 / 10);
  win.loadURL("http://localhost:5173");
}

async function initializeLocalRuntime() {
  try {
    clientConfig = loadClientConfig(app.getPath("userData"));
    databasePool = createDatabasePool({ host: clientConfig.DATABASE.HOST, port: clientConfig.DATABASE.PORT, user: clientConfig.DATABASE.USER, password: clientConfig.DATABASE.PASSWORD, database: clientConfig.DATABASE.NAME, connectionLimit: clientConfig.DATABASE.CONNECTION_LIMIT });
    erpRepository = createErpRepository(databasePool);
    authRepository = createAuthRepository(databasePool);
    procurementRepository = createProcurementRepository(databasePool);
    payrollRepository = createPayrollRepository(databasePool);
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

app.whenReady().then(async () => {
  await initializeLocalRuntime();
  registerIpcHandlers();
  createWindow();
}).catch((error) => console.error("Electron startup failed:", error instanceof Error ? error.stack ?? error.message : error));

app.on("window-all-closed", () => {
  if (databasePool) databasePool.end().catch(() => undefined);
  if (process.platform !== "darwin") app.quit();
});
