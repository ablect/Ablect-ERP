import { create } from "zustand";

export type PermissionAction = "view" | "create" | "edit" | "delete" | "export";
export type AdminRole = "Super Admin" | "Administrator" | "Sales Manager" | "Cashier" | "Inventory Manager" | "HR Manager" | "Finance" | "Marketer" | "Viewer";
export type AppModule = "Dashboard" | "Sales" | "Products" | "Inventory" | "Purchases" | "Customers" | "Suppliers" | "Warehouse" | "CRM" | "HR" | "Payroll" | "Reports" | "Settings" | "Users";
export interface PermissionSet { view: boolean; create: boolean; edit: boolean; delete: boolean; export: boolean; }
export type PermissionMatrix = Record<AppModule, PermissionSet>;
export interface SystemUser { id: string; name: string; email: string; role: AdminRole; department: string; status: "Active" | "Suspended" | "Invited"; lastActive: string; twoFactor: boolean; }
export interface AuditLog { id: string; timestamp: string; actor: string; action: string; module: AppModule; severity: "Info" | "Warning" | "Critical"; reference?: string; }

const modules: AppModule[] = ["Dashboard", "Sales", "Products", "Inventory", "Purchases", "Customers", "Suppliers", "Warehouse", "CRM", "HR", "Payroll", "Reports", "Settings", "Users"];
const full = (): PermissionSet => ({ view: true, create: true, edit: true, delete: true, export: true });
const none = (): PermissionSet => ({ view: false, create: false, edit: false, delete: false, export: false });
const viewOnly = (): PermissionSet => ({ view: true, create: false, edit: false, delete: false, export: true });
const withOverrides = (overrides: Partial<Record<AppModule, PermissionSet>>): PermissionMatrix => Object.fromEntries(modules.map((module) => [module, overrides[module] ? { ...overrides[module] } : none()])) as PermissionMatrix;
export const DEFAULT_ROLE_PERMISSIONS: Record<AdminRole, PermissionMatrix> = {
  "Super Admin": Object.fromEntries(modules.map((m) => [m, full()])) as PermissionMatrix,
  Administrator: Object.fromEntries(modules.map((m) => [m, full()])) as PermissionMatrix,
  "Sales Manager": withOverrides({ Sales: full(), Customers: full(), CRM: full(), Products: { ...full(), delete: false }, Reports: viewOnly(), Dashboard: viewOnly() }),
  Cashier: withOverrides({ Sales: { view: true, create: true, edit: true, delete: false, export: false }, Customers: { view: true, create: true, edit: true, delete: false, export: false }, Products: viewOnly(), Dashboard: viewOnly() }),
  "Inventory Manager": withOverrides({ Products: full(), Inventory: full(), Purchases: full(), Suppliers: full(), Warehouse: full(), Dashboard: viewOnly(), Reports: viewOnly() }),
  "HR Manager": withOverrides({ HR: full(), Users: full(), Payroll: full(), Reports: viewOnly(), Dashboard: viewOnly() }),
  Finance: withOverrides({ Reports: full(), Payroll: full(), Purchases: viewOnly(), Sales: viewOnly(), Dashboard: viewOnly() }),
  Marketer: withOverrides({ Customers: { view: true, create: true, edit: true, delete: false, export: true }, CRM: { view: true, create: true, edit: true, delete: false, export: true }, Sales: viewOnly(), Dashboard: viewOnly() }),
  Viewer: Object.fromEntries(modules.map((m) => [m, viewOnly()])) as PermissionMatrix,
};

interface AdminState {
 users: SystemUser[]; roles: Record<AdminRole, PermissionMatrix>; auditLogs: AuditLog[]; selectedRole: AdminRole;
 setSelectedRole: (role: AdminRole) => void; togglePermission: (role: AdminRole, module: AppModule, action: PermissionAction) => void;
 addUser: (user: Omit<SystemUser,"id"|"lastActive">) => void; setUserRole: (userId: string, role: AdminRole) => void; setUserStatus: (userId: string, status: SystemUser["status"]) => void;
 addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
 users: [
  { id:"u1",name:"Toba Oluwatoba",email:"admin@ablect.com",role:"Super Admin",department:"Management",status:"Active",lastActive:"Just now",twoFactor:true },
  { id:"u2",name:"Adebayo James",email:"sales@ablect.com",role:"Sales Manager",department:"Sales",status:"Active",lastActive:"5 min ago",twoFactor:true },
  { id:"u3",name:"Grace Okafor",email:"cashier@ablect.com",role:"Cashier",department:"Retail",status:"Active",lastActive:"12 min ago",twoFactor:false },
  { id:"u4",name:"Michael Ade",email:"inventory@ablect.com",role:"Inventory Manager",department:"Operations",status:"Active",lastActive:"32 min ago",twoFactor:true },
 ],
 roles: DEFAULT_ROLE_PERMISSIONS, selectedRole:"Cashier",
 auditLogs: [
  {id:"a1",timestamp:"2026-08-09 16:52",actor:"Toba Oluwatoba",action:"Changed discount approval rule",module:"Settings",severity:"Warning",reference:"SEC-1042"},
  {id:"a2",timestamp:"2026-08-09 16:34",actor:"Adebayo James",action:"Created sales order",module:"Sales",severity:"Info",reference:"SO-1048"},
  {id:"a3",timestamp:"2026-08-09 15:58",actor:"Grace Okafor",action:"Attempted manager-only discount",module:"Sales",severity:"Warning",reference:"POS-771"},
  {id:"a4",timestamp:"2026-08-09 15:21",actor:"Toba Oluwatoba",action:"Updated Cashier role permissions",module:"Users",severity:"Critical",reference:"RBAC-209"},
 ],
 setSelectedRole: role => set({selectedRole:role}),
 togglePermission: (role,module,action) => set(state=>({roles:{...state.roles,[role]:{...state.roles[role],[module]:{...state.roles[role][module],[action]:!state.roles[role][module][action]}}}})),
 addUser: user => set(state=>({users:[{...user,id:crypto.randomUUID(),lastActive:"Never"},...state.users]})),
 setUserRole: (id,role) => set(state=>({users:state.users.map(u=>u.id===id?{...u,role}:u)})),
 setUserStatus: (id,status) => set(state=>({users:state.users.map(u=>u.id===id?{...u,status}:u)})),
 addAuditLog: log => set(state=>({auditLogs:[{...log,id:crypto.randomUUID(),timestamp:new Date().toLocaleString("en-NG")},...state.auditLogs]})),
}));
