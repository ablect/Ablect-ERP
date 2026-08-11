import fs from "node:fs";
import path from "node:path";
import { app } from "electron";

const MAX_BYTES = 5 * 1024 * 1024;
const MAX_FILES = 5;

function rotateIfNeeded(filePath) {
  try {
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size < MAX_BYTES) return;
    for (let index = MAX_FILES - 1; index >= 1; index -= 1) {
      const source = `${filePath}.${index}`;
      const target = `${filePath}.${index + 1}`;
      if (fs.existsSync(source)) fs.renameSync(source, target);
    }
    fs.renameSync(filePath, `${filePath}.1`);
  } catch {
    // Logging must never crash the application.
  }
}

export function initializeLogging() {
  const directory = path.join(app.getPath("appData"), "AblectBusinessSuite");
  fs.mkdirSync(directory, { recursive: true });
  const filePath = path.join(directory, "error_log.txt");

  const write = (level, message, details = {}) => {
    try {
      rotateIfNeeded(filePath);
      const line = JSON.stringify({ timestamp: new Date().toISOString(), level, message, ...details });
      fs.appendFileSync(filePath, `${line}\r\n`, "utf8");
    } catch {
      // Intentionally silent.
    }
  };

  process.on("uncaughtException", (error) => write("error", "uncaughtException", { stack: error?.stack, error: String(error) }));
  process.on("unhandledRejection", (reason) => write("error", "unhandledRejection", { error: String(reason) }));

  return { filePath, error: (message, details) => write("error", message, details) };
}
