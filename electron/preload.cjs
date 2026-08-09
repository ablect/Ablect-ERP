const { contextBridge, ipcRenderer } = require("electron");

/**
 * Keep the renderer isolated from Node.js. Only the small, read-only runtime
 * surface required by the UI is exposed here.
 */
contextBridge.exposeInMainWorld("ablectDesktop", {
  getClientConfig: () => ipcRenderer.invoke("client-config:get"),
  getDatabaseStatus: () => ipcRenderer.invoke("database:status"),
});
