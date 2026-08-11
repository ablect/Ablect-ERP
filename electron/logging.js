import fs from "node:fs";
import path from "node:path";
import { app } from "electron";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createLogger, format, transports } = require("winston");
const DailyRotateFile = null;

export function initializeLogging() {
  const logDirectory = path.join(app.getPath("appData"), "AblectBusinessSuite");
  fs.mkdirSync(logDirectory, { recursive: true });
  const logFile = path.join(logDirectory, "error_log.txt");

  const logger = createLogger({
    level: "error",
    format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
    transports: [
      new transports.File({ filename: logFile, maxsize: 5 * 1024 * 1024, maxFiles: 5 }),
    ],
    exitOnError: false,
  });

  process.on("uncaughtException", (error) => logger.error("uncaughtException", { error }));
  process.on("unhandledRejection", (reason) => logger.error("unhandledRejection", { reason }));

  return { logger, logFile };
}
