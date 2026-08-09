import fs from "node:fs/promises";
import path from "node:path";
import { app, BrowserWindow, ipcMain } from "electron";
import { createDatabasePool, testDatabaseConnection } from "./database/db.js";
import { initializeDatabase } from "./database/schema.js";
import { createErpRepository } from "./database/erp-repository.js";
import { loadClientConfig, resolveClientLogoPath } from "./config/client-config.js";

let clientConfig;
let databasePool;
let erpRepository;
let databaseStatus = { connected: false, error: null };

async function buildClientConfigPayload() {
  const logoPath = resolveClientLogoPath(clientConfig, app.getPath("userData"));
  let logoDataUrl = null;

  if (logoPath) {
    try {
      const image = await fs.readFile(logoPath);
      const extension = path.extname(logoPath).toLowerCase();
      const mime = extension === ".svg"
        ? "image/svg+xml"
        : extension === ".webp"
          ? "image/webp"
          : extension === ".jpg" || extension === ".jpeg"
            ? "image/jpeg"
            : "image/png";
      logoDataUrl = `data:${mime};base64,${image.toString("base64")}`;
    } catch {
      // A missing logo must never prevent the ERP from starting.
    }
  }

  return {
    businessName: clientConfig.CLIENT_BUSINESS_NAME,
    installationDate: clientConfig.INSTALLATION_DATE,
    logoPath,
    logoDataUrl,
    configPath: clientConfig.CONFIG_PATH,
  };
}

async function syncInstallationSettings() {
  await databasePool.query(
    `INSERT INTO client_settings (id, business_name, logo_path, installation_date)
     VALUES (1, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       business_name = VALUES(business_name),
       logo_path = VALUES(logo_path),
       installation_date = VALUES(installation_date)`,
    [
      clientConfig.CLIENT_BUSINESS_NAME,
      clientConfig.CLIENT_LOGO_PATH || null,
      clientConfig.INSTALLATION_DATE || new Date().toISOString().slice(0, 10),
    ],
  );
}

function registerIpcHandlers() {
  ipcMain.handle("client-config:get", buildClientConfigPayload);
  ipcMain.handle("database:status", () => databaseStatus);

  ipcMain.handle("erp:products:list", (_event, search = "") => erpRepository.listProducts(search));
  ipcMain.handle("erp:customers:list", (_event, search = "") => erpRepository.listCustomers(search));
  ipcMain.handle("erp:suppliers:list", (_event, search = "") => erpRepository.listSuppliers(search));
  ipcMain.handle("erp:warehouses:list", () => erpRepository.listWarehouses());
  ipcMain.handle("erp:dashboard:metrics", () => erpRepository.getDashboardMetrics());
  ipcMain.handle("erp:sales:create", (_event, payload) => erpRepository.createSale(payload));
  ipcMain.handle("erp:purchases:receive", (_event, payload) => erpRepository.receivePurchaseOrder(payload));
  ipcMain.handle("erp:stock:transfer", (_event, payload) => erpRepository.transferStock(payload));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 850,
    minWidth: 1200,
    minHeight: 700,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), "electron", "preload-erp.cjs"),
    },
  });

  win.loadURL("http://localhost:5173");
}

async function initializeLocalRuntime() {
  clientConfig = loadClientConfig(app.getPath("userData"));
  databasePool = createDatabasePool({
    host: clientConfig.DATABASE.HOST,
    port: clientConfig.DATABASE.PORT,
    user: clientConfig.DATABASE.USER,
    password: clientConfig.DATABASE.PASSWORD,
    database: clientConfig.DATABASE.NAME,
    connectionLimit: clientConfig.DATABASE.CONNECTION_LIMIT,
  });
  erpRepository = createErpRepository(databasePool);

  try {
    await testDatabaseConnection(databasePool);
    await initializeDatabase(databasePool, [
      path.join(app.getAppPath(), "electron", "database", "schema.sql"),
      path.join(app.getAppPath(), "electron", "database", "schema.erp.sql"),
    ]);
    await syncInstallationSettings();
    databaseStatus = { connected: true, error: null };
    console.log(`MySQL connected: ${clientConfig.DATABASE.HOST}:${clientConfig.DATABASE.PORT}/${clientConfig.DATABASE.NAME}`);
  } catch (error) {
    databaseStatus = {
      connected: false,
      error: error instanceof Error ? error.message : String(error),
    };
    console.error("MySQL initialization failed:", databaseStatus.error);
  }
}

app.whenReady().then(async () => {
  await initializeLocalRuntime();
  registerIpcHandlers();
  createWindow();
});

app.on("window-all-closed", () => {
  if (databasePool) {
    databasePool.end().catch(() => undefined);
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});
