export type Permission={module:string;view:boolean;create:boolean;edit:boolean;delete:boolean};
export type AuthSession={token:string;expiresAt:string;user:{id:string;name:string;email:string;role:string;roleId:string|null;permissions:Permission[]}};
export type PrinterInfo={name:string;displayName:string;description:string;status:number;isDefault:boolean};
export type UnitType={id:string;code:string;name:string;allowsDecimal:boolean;isActive:boolean};
export type SettingRecord={key:string;value:Record<string,unknown>;updatedAt:string};
type DatabaseStatus={connected:boolean;error:string|null};
type DesktopApi={
  getClientConfig:()=>Promise<unknown>;getDatabaseStatus:()=>Promise<DatabaseStatus>;
  auth:{login:(identifier:string,password:string)=>Promise<AuthSession>;validate:(token:string)=>Promise<AuthSession["user"]|null>;logout:(token:string)=>Promise<void>;changePassword:(token:string,currentPassword:string,newPassword:string)=>Promise<{changed:boolean}>;supportReset:(token:string,newPassword:string)=>Promise<unknown>};
  license:{status:()=>Promise<unknown>};
  setup:{status:()=>Promise<unknown>;complete:(payload:unknown)=>Promise<unknown>};
  erp:{products:{list:(search?:string)=>Promise<unknown[]>;create:(payload:unknown)=>Promise<unknown>;update:(payload:unknown)=>Promise<unknown>;delete:(id:string)=>Promise<unknown>};units:{list:()=>Promise<UnitType[]>};customers:{list:(search?:string)=>Promise<unknown[]>;create:(payload:unknown)=>Promise<unknown>;update:(payload:unknown)=>Promise<unknown>;delete:(id:string)=>Promise<unknown>};suppliers:{list:(search?:string)=>Promise<unknown[]>;create:(payload:unknown)=>Promise<unknown>};warehouses:{list:()=>Promise<unknown[]>;create:(payload:unknown)=>Promise<unknown>};dashboard:{metrics:()=>Promise<unknown>};sales:{create:(payload:unknown)=>Promise<unknown>;list:()=>Promise<unknown[]>};purchases:{create:(payload:unknown)=>Promise<unknown>;receive:(payload:unknown)=>Promise<unknown>;list:()=>Promise<unknown[]>};stock:{transfer:(payload:unknown)=>Promise<unknown>;movements:()=>Promise<unknown[]>;reserve:(payload:unknown)=>Promise<unknown>;release:(payload:unknown)=>Promise<unknown>};crm:{opportunities:()=>Promise<unknown[]>;activities:()=>Promise<unknown[]>};hr:{employees:()=>Promise<unknown[]>;attendance:()=>Promise<unknown[]>};payroll:{runs:()=>Promise<unknown[]>;calculate:(payload:unknown)=>Promise<unknown>};admin:{users:()=>Promise<unknown[]>;roles:()=>Promise<unknown[]>;auditLogs:()=>Promise<unknown[]>};reports:{summary:(from?:string,to?:string)=>Promise<unknown>}};
  settings:{all:()=>Promise<SettingRecord[]>;get:(key:string)=>Promise<SettingRecord|null>;save:(key:string,value:Record<string,unknown>,userId?:string)=>Promise<SettingRecord|null>};
  hardware:{printers:{list:()=>Promise<PrinterInfo[]>};receipt:{print:(payload:unknown)=>Promise<unknown>;pdf:(payload:unknown)=>Promise<unknown>}};
};
export function desktopApi():DesktopApi|null{if(typeof window==="undefined")return null;return window.ablectDesktop as unknown as DesktopApi;}
export function requireDesktopApi():DesktopApi{const api=desktopApi();if(!api)throw new Error("Ablect Desktop bridge is unavailable. Start the ERP through Electron.");return api;}
