const { contextBridge, ipcRenderer } = require("electron");

/**
 * Explicit IPC allow-list. SQL credentials and Node APIs never cross into the
 * renderer process; only application-level commands are exposed.
 */
contextBridge.exposeInMainWorld("ablectDesktop", {
  getClientConfig: () => ipcRenderer.invoke("client-config:get"),
  getDatabaseStatus: () => ipcRenderer.invoke("database:status"),
  auth: {
    login: (identifier, password) => ipcRenderer.invoke("auth:login", identifier, password),
    validate: (token) => ipcRenderer.invoke("auth:validate", token),
    logout: (token) => ipcRenderer.invoke("auth:logout", token),
  },
  erp: {
    products: {
      list: (search = "") => ipcRenderer.invoke("erp:products:list", search),
      create: (payload) => ipcRenderer.invoke("erp:products:create", payload),
      update: (payload) => ipcRenderer.invoke("erp:products:update", payload),
      delete: (id) => ipcRenderer.invoke("erp:products:delete", id),
    },
    customers: {
      list: (search = "") => ipcRenderer.invoke("erp:customers:list", search),
      create: (payload) => ipcRenderer.invoke("erp:customers:create", payload),
      update: (payload) => ipcRenderer.invoke("erp:customers:update", payload),
      delete: (id) => ipcRenderer.invoke("erp:customers:delete", id),
    },
    suppliers: { list: (search = "") => ipcRenderer.invoke("erp:suppliers:list", search) },
    warehouses: { list: () => ipcRenderer.invoke("erp:warehouses:list") },
    dashboard: { metrics: () => ipcRenderer.invoke("erp:dashboard:metrics") },
    sales: { list: () => ipcRenderer.invoke("erp:sales:list"), create: (payload) => ipcRenderer.invoke("erp:sales:create", payload) },
    purchases: { list: () => ipcRenderer.invoke("erp:purchases:list"), receive: (payload) => ipcRenderer.invoke("erp:purchases:receive", payload) },
    stock: {
      transfer: (payload) => ipcRenderer.invoke("erp:stock:transfer", payload),
      movements: () => ipcRenderer.invoke("erp:stock:movements"),
      reserve: (payload) => ipcRenderer.invoke("erp:stock:reserve", payload),
      release: (payload) => ipcRenderer.invoke("erp:stock:release", payload),
    },
    crm: {
      opportunities: () => ipcRenderer.invoke("erp:crm:opportunities"),
      activities: () => ipcRenderer.invoke("erp:crm:activities"),
    },
    hr: { employees: () => ipcRenderer.invoke("erp:hr:employees"), attendance: () => ipcRenderer.invoke("erp:hr:attendance") },
    payroll: { runs: () => ipcRenderer.invoke("erp:payroll:runs") },
    admin: {
      users: () => ipcRenderer.invoke("erp:admin:users"),
      roles: () => ipcRenderer.invoke("erp:admin:roles"),
      auditLogs: () => ipcRenderer.invoke("erp:admin:audit-logs"),
    },
    reports: { summary: (from, to) => ipcRenderer.invoke("erp:reports:summary", from, to) },
  },
});
