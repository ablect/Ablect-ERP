import fs from "node:fs";
import path from "node:path";

const DEFAULT_CONFIG = {
  CLIENT_BUSINESS_NAME: "Ablect Business Suite",
  CLIENT_LOGO_PATH: "",
  INSTALLATION_DATE: "",
  DATABASE: { HOST: "127.0.0.1", PORT: 3306, NAME: "ablect_business_suite", USER: "ablect_app", PASSWORD: "", ADMIN_USER: "root", ADMIN_PASSWORD: "", CONNECTION_LIMIT: 10 },
};
function readJsonFile(filePath) { if (!fs.existsSync(filePath)) return null; try { return JSON.parse(fs.readFileSync(filePath, "utf8")); } catch (error) { throw new Error(`Invalid client configuration at ${filePath}: ${error.message}`); } }
export function loadClientConfig(userDataPath) {
  const explicitPath = process.env.ABLECT_CLIENT_CONFIG_PATH;
  const candidates = [explicitPath, path.join(userDataPath, "client-config.json"), path.join(process.cwd(), "client-config.json")].filter(Boolean);
  const configPath = candidates.find((candidate) => fs.existsSync(candidate)); const fileConfig = configPath ? readJsonFile(configPath) : null;
  const merged = { ...DEFAULT_CONFIG, ...fileConfig, DATABASE: { ...DEFAULT_CONFIG.DATABASE, ...(fileConfig?.DATABASE ?? {}) } };
  if (!merged.CLIENT_BUSINESS_NAME?.trim()) throw new Error("CLIENT_BUSINESS_NAME is required in client-config.json");
  return { ...merged, CONFIG_PATH: configPath ?? path.join(userDataPath, "client-config.json") };
}
export function resolveClientLogoPath(config, userDataPath) { if (!config.CLIENT_LOGO_PATH) return null; return path.isAbsolute(config.CLIENT_LOGO_PATH) ? config.CLIENT_LOGO_PATH : path.resolve(userDataPath, config.CLIENT_LOGO_PATH); }
