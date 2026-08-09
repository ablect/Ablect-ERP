const { contextBridge, ipcRenderer } = require("electron");

/**
 * Minimal, explicit bridge for the renderer. Node.js, SQL and database
 * credentials remain isolated inside Electron's main process.
 */
contextBridge.exposeInMainWorld("ablectDesktop", {
  getClientConfig: () => ipcRenderer.invoke("client-config:get"),
  getDatabaseStatus: () => ipcRenderer.invoke("database:status"),
  erp: {
    products: { list: (search = "") => ipcRenderer.invoke("erp:products:list", search) },
    customers: { list: (search = "") => ipcRenderer.invoke("erp:customers:list", search) },
    suppliers: { list: (search = "") => ipcRenderer.invoke("erp:suppliers:list", search) },
    warehouses: { list: () => ipcRenderer.invoke("erp:warehouses:list") },
    dashboard: { metrics: () => ipcRenderer.invoke("erp:dashboard:metrics") },
    sales: { create: (payload) => ipcRenderer.invoke("erp:sales:create", payload) },
    purchases: { receive: (payload) => ipcRenderer.invoke("erp:purchases:receive", payload) },
    stock: { transfer: (payload) => ipcRenderer.invoke("erp:stock:transfer", payload) },
  },
});
