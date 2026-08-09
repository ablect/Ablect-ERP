import type { Warehouse } from "../types/Warehouse";
function api(){if(!window.ablectDesktop?.erp?.warehouses)throw new Error("Desktop data bridge is unavailable.");return window.ablectDesktop.erp.warehouses;}
export const warehouseService={
 async getAll():Promise<Warehouse[]>{const rows=await api().list() as Array<Record<string,unknown>>;return rows.map((row)=>({id:String(row.id),code:String(row.code??""),name:String(row.name??""),location:String(row.address??""),manager:"Warehouse Team",capacity:10000,currentStock:Number(row.total_units??0),status:row.is_active?"Active":"Inactive"}));},
 async create(warehouse:Warehouse):Promise<Warehouse[]>{return (await api().create(warehouse)) as Warehouse[];},
 async delete(id:string){throw new Error(`Warehouse ${id} deletion is disabled. Deactivate warehouses instead.`);},
};
