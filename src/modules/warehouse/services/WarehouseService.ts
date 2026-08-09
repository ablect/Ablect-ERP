import type { Warehouse } from "../types/Warehouse";
import { requireDesktopApi } from "../../../lib/desktopApi";
function mapWarehouse(row:unknown):Warehouse{const w=row as Record<string,unknown>;return{id:String(w.id),code:String(w.code??""),name:String(w.name??""),location:String(w.address??""),manager:"Warehouse Team",capacity:10000,currentStock:Number(w.total_units??0),status:w.is_active?"Active":"Inactive"};}
export const warehouseService={
 async getAll():Promise<Warehouse[]>{return (await requireDesktopApi().erp.warehouses.list()).map(mapWarehouse);},
 async create(warehouse:Warehouse):Promise<Warehouse[]>{return (await requireDesktopApi().erp.warehouses.create(warehouse) as unknown[]).map(mapWarehouse);},
 async delete(id:string){throw new Error(`Warehouse ${id} deletion is disabled. Deactivate warehouses instead.`);},
};
