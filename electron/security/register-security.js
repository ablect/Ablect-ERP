import { changePassword } from "./password-service.js";
import { validateLicense } from "./license.js";
import { getFirstRunStatus, completeFirstRun } from "../setup/first-run.js";

export function registerSecurityIpc(ipcMain, { pool, userDataPath, logger }) {
  const safe = (channel, handler) => {
    ipcMain.handle(channel, async (_event, ...args) => {
      try { return await handler(...args); }
      catch (error) { logger?.error(`IPC failure: ${channel}`, { error: error instanceof Error ? error.stack : String(error) }); throw error; }
    });
  };
  safe("auth:change-password", (token, currentPassword, newPassword) => changePassword(pool, token, currentPassword, newPassword));
  safe("license:status", () => validateLicense(userDataPath));
  safe("setup:status", () => getFirstRunStatus(pool, userDataPath));
  safe("setup:complete", (payload) => completeFirstRun(pool, userDataPath, payload));
}
