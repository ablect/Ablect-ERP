import fs from "node:fs";
import path from "node:path";

const DEV_DATABASE_PASSWORD = "AblectLocal!2026";

const DEFAULT_CONFIG = {
  CLIENT_BUSINESS_NAME: "Ablect Business Suite",
  CLIENT_LOGO_PATH: "",
  INSTALLATION_DATE: "",
  DATABASE: {
    HOST: "127.0.0.1",
    PORT: 3306,
    NAME: "ablect_business_suite",
    USER: "ablect_app",
    PASSWORD: "",
    CONNECTION_LIMIT: 10,
  },
};

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    if (process.defaultApp) {
      console.warn(`Ignoring invalid development client configuration at ${filePath}: ${error.message}`);
      return null;
    }
    throw new Error(`Invalid client configuration at ${filePath}: ${error.message}`);
  }
}

/**
 * Loads installation settings without modifying application source code.
 *
 * Priority:
 * 1. ABLECT_CLIENT_CONFIG_PATH environment variable (installer/admin override)
 * 2. Electron userData/client-config.json (recommended packaged location)
 * 3. Project-root client-config.json (development fallback)
 * 4. Built-in defaults
 *
 * In development, the local setup script provisions the fixed development
 * MySQL account and password. This also lets a malformed old client-config.json
 * recover instead of blocking Electron startup.
 */
export function loadClientConfig(userDataPath) {
  const explicitPath = process.env.ABLECT_CLIENT_CONFIG_PATH;
  const candidates = [
    explicitPath,
    path.join(userDataPath, "client-config.json"),
    path.join(process.cwd(), "client-config.json"),
  ].filter(Boolean);

  const configPath = candidates.find((candidate) => fs.existsSync(candidate));
  const fileConfig = configPath ? readJsonFile(configPath) : null;
  const isDevelopment = process.defaultApp === true;

  const merged = {
    ...DEFAULT_CONFIG,
    ...fileConfig,
    DATABASE: {
      ...DEFAULT_CONFIG.DATABASE,
      ...(fileConfig?.DATABASE ?? {}),
      ...(isDevelopment && !fileConfig?.DATABASE?.PASSWORD
        ? { PASSWORD: DEV_DATABASE_PASSWORD }
        : {}),
      ...(process.env.ABLECT_DB_HOST ? { HOST: process.env.ABLECT_DB_HOST } : {}),
      ...(process.env.ABLECT_DB_PORT ? { PORT: Number(process.env.ABLECT_DB_PORT) } : {}),
      ...(process.env.ABLECT_DB_NAME ? { NAME: process.env.ABLECT_DB_NAME } : {}),
      ...(process.env.ABLECT_DB_USER ? { USER: process.env.ABLECT_DB_USER } : {}),
      ...(process.env.ABLECT_DB_PASSWORD ? { PASSWORD: process.env.ABLECT_DB_PASSWORD } : {}),
      ...(process.env.ABLECT_DB_CONNECTION_LIMIT
        ? { CONNECTION_LIMIT: Number(process.env.ABLECT_DB_CONNECTION_LIMIT) }
        : {}),
    },
  };

  if (!merged.CLIENT_BUSINESS_NAME?.trim()) {
    throw new Error("CLIENT_BUSINESS_NAME is required in client-config.json");
  }
  if (!merged.DATABASE.HOST || !merged.DATABASE.PORT || !merged.DATABASE.NAME || !merged.DATABASE.USER) {
    throw new Error("Database host, port, name and user are required in client-config.json");
  }
  if (!merged.DATABASE.PASSWORD) {
    throw new Error(
      `MySQL password is missing. Set DATABASE.PASSWORD in ${configPath ?? "client-config.json"} or set ABLECT_DB_PASSWORD.`,
    );
  }

  return {
    ...merged,
    CONFIG_PATH: configPath ?? path.join(userDataPath, "client-config.json"),
  };
}

export function resolveClientLogoPath(config, userDataPath) {
  if (!config.CLIENT_LOGO_PATH) return null;
  return path.isAbsolute(config.CLIENT_LOGO_PATH)
    ? config.CLIENT_LOGO_PATH
    : path.resolve(userDataPath, config.CLIENT_LOGO_PATH);
}
