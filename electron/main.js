import fs from "node:fs/promises";
import path from "node:path";
import { app, BrowserWindow, ipcMain } from "electron";
import { ensureDatabaseExists, createDatabasePool, testDatabaseConnection } from "./database/db.js";
import { runMigrations } from "./database/migrate.js";
import { createErpRepository } from "./database/erp-repository.js";
import { createSalesService } from "./database/sales-service.js";
import { createAuthRepository } from "./database/auth-repository.js";
import { createProcurementRepository } from "./database/procurement-repository.js";
import { createPayrollRepository } from "./database/payroll-repository.js";
import { loadClientConfig, resolveClientLogoPath } from "./config/client-config.js";
import { initializeLogging } from "./logging.js";
import { registerSecurityIpc } from "./security/register-security.js";

let clientConfig;
let databasePool;
let erpRepository;
let salesService;
let authRepository;
let procurementRepository;
let payrollRepository;
let logger;
let databaseStatus = { connected: false, error: null };

async function buildClientConfigPayload() {
  const logoPath = resolveClientLogoPath(clientConfig, app.getPath("userData"));
  let logoDataUrl = null;
  if (logoPath) {
    try {
      const image = await fs.readFile(logoPath);
      const extension = path.extname(logoPath).toLowerCase();
      const mime = extension === ".svg" ? "image/svg+xml" : extension === ".webp" ? "image/webp" : extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : "image/png";
      logoDataUrl = `data:${mime};base64,${image.toString("base64")}`;
    } catch (error) { logger?.error("Unable to load client logo", { error: String(error) }); }
  }
  return { businessName: clientConfig.CLIENT_BUSINESS_NAME, installationDate: clientConfig.INSTALLATION_DATE, logoPath, logoDataUrl, configPath: clientConfig.CONFIG_PATH };
}

async function syncInstallationSettings() {
  await databasePool.query(`INSERT INTO client_settings (id,business_name,logo_path,installation_date) VALUES (1,?,?,?) ON DUPLICATE KEY UPDATE business_name=VALUES(business_name),logo_path=VALUES(logo_path),installation_date=VALUES(installation_date)`, [clientConfig.CLIENT_BUSINESS_NAME, clientConfig.CLIENT_LOGO_PATH || null, clientConfig.INSTALLATION_DATE || new Date().toISOString().slice(0, 10)]);
}

function safeHandle(channel, handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    try { return await handler(event, ...args); }
    catch (error) { logger?.error(`IPC failure: ${channel}`, { error: error instanceof Error ? error.stack : String(error) }); throw error; }
  });
}

function registerIpcHandlers() {
  safeHandle("client-config:get", buildClientConfigPayload);
  safeHandle("database:status", () => databaseStatus);
  safeHandle("auth:login", (_event, identifier, password) => authRepository.login(identifier, password));
  safeHandle("auth:validate", (_event, token) => authRepository.validateSession(token));
  safeHandle("auth:logout", (_event, token) => authRepository.logout(token));
  safeHandle("erp:products:list", (_event, search = "") => erpRepository.listProducts(search));
  safeHandle("erp:products:create", (_event, payload) => erpRepository.createProduct(payload));
  safeHandle("erp:products:update", (_event, payload) => erpRepository.updateProduct(payload));
  safeHandle("erp:products:delete", (_event, id) => erpRepository.deleteProduct(id));
  safeHandle("erp:customers:list", (_event, search = "") => erpRepository.listCustomers(search));
  safeHandle("erp:customers:create", (_event, payload) => erpRepository.createCustomer(payload));
  safeHandle("erp:customers:update", (_event, payload) => erpRepository.updateCustomer(payload));
  safeHandle("erp:customers:delete", (_event, id) => erpRepository.deleteCustomer(id));
  safeHandle("erp:suppliers:list", () => erpRepository.listSuppliers());
  safeHandle("erp:suppliers:create", (_event, payload) => procurementRepository.createSupplier(payload));
  safeHandle("erp:warehouses:list", () => erpRepository.listWarehouses());
  safeHandle("erp:warehouses:create", (_event, payload) => procurementRepository.createWarehouse(payload));
  safeHandle("erp:dashboard:metrics", () => erpRepository.getDashboardMetrics());
  safeHandle("erp:sales:list", () => erpRepository.listSales());
  safeHandle("erp:sales:create", (_event, payload) => salesService.createSale(payload));
  safeHandle("erp:purchases:list", () => erpRepository.listPurchaseOrders());
  safeHandle("erp:purchases:create", (_event, payload) => procurementRepository.createPurchaseOrder(payload));
  safeHandle("erp:purchases:receive", (_event, payload) => erpRepository.receivePurchaseOrder(payload));
  safeHandle("erp:stock:transfer", (_event, payload) => erpRepository.transferStock(payload));
  safeHandle("erp:stock:movements", () => erpRepository.listStockMovements());
  safeHandle("erp:stock:reserve", (_event, payload) => erpRepository.reserveStock(payload));
  safeHandle("erp:stock:release", (_event, payload) => erpRepository.releaseStock(payload));
  safeHandle("erp:crm:opportunities", () => erpRepository.listOpportunities());
  safeHandle("erp:crm:activities", () => erpRepository.listActivities());
  safeHandle("erp:hr:employees", () => erpRepository.listEmployees());
  safeHandle("erp:hr:attendance", () => erpRepository.listAttendance());
  safeHandle("erp:payroll:runs", () => erpRepository.listPayrollRuns());
  safeHandle("erp:payroll:calculate", (_event, payload) => payrollRepository.calculateRun(payload));
  safeHandle("erp:admin:users", () => erpRepository.listUsers());
  safeHandle("erp:admin:roles", () => erpRepository.listRoles());
  safeHandle("erp:admin:audit-logs", () => erpRepository.listAuditLogs());
  safeHandle("erp:reports:summary", (_event, from, to) => erpRepository.getReportSummary(from, to));
}

function createWindow() {
  const win = new BrowserWindow({ width: 1400, height: 850, minWidth: 1200, minHeight: 700, autoHideMenuBar: true, webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(app.getAppPath(), "electron", "preload-erp.cjs") } });
  if (app.isPackaged) win.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
  else win.loadURL("http://localhost:5173");
}

async function initializeLocalRuntime() {
  clientConfig = loadClientConfig(app.getPath("userData"));
  const dbConfig = { host: clientConfig.DATABASE.HOST, port: clientConfig.DATABASE.PORT, user: clientConfig.DATABASE.USER, password: clientConfig.DATABASE.PASSWORD, database: clientConfig.DATABASE.NAME, connectionLimit: clientConfig.DATABASE.CONNECTION_LIMIT };
  try {
    await ensureDatabaseExists(dbConfig);
    databasePool = createDatabasePool(dbConfig);
    erpRepository = createErpRepository(databasePool);
    salesService = createSalesService(databasePool);
    authRepository = createAuthRepository(databasePool);
    procurementRepository = createProcurementRepository(databasePool);
    payrollRepository = createPayrollRepository(databasePool);
    await testDatabaseConnection(databasePool);
    await runMigrations(databasePool, app.getAppPath());
    await syncInstallationSettings();
    await authRepository.cleanupSessions();
    databaseStatus = { connected: true, error: null };
  } catch (error) {
    databaseStatus = { connected: false, error: error instanceof Error ? error.message : String(error) };
    logger?.error("MySQL initialization failed", { error: databaseStatus.error, stack: error instanceof Error ? error.stack : undefined });
  }
}

app.whenReady().then(async () => {
  logger = initializeLogging();
  await initializeLocalRuntime();
  registerIpcHandlers();
  if (databasePool) registerSecurityIpc(ipcMain, { pool: databasePool, userDataPath: app.getPath("userData"), logger });
  createWindow();
});

app.on("window-all-closed", () => {
  if (databasePool) databasePool.end().catch((error) => logger?.error("Database pool shutdown failed", { error: String(error) }));
  if (process.platform !== "darwin") app.quit();
});
