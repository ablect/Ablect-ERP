import type { Supplier } from "../types/Supplier";
import { requireDesktopApi } from "../../../lib/desktopApi";
function mapSupplier(row:unknown):Supplier{const s=row as Record<string,unknown>;return{id:String(s.id),name:String(s.name??""),contactPerson:String(s.contactPerson??s.contact_person??""),phone:String(s.phone??""),email:String(s.email??""),address:String(s.address??""),active:Boolean(s.active??s.is_active),createdAt:String(s.createdAt??s.created_at??"")};}
export const supplierService={
 async getAll():Promise<Supplier[]>{return (await requireDesktopApi().erp.suppliers.list()).map(mapSupplier);},
 async create(supplier:Supplier):Promise<Supplier[]>{return (await requireDesktopApi().erp.suppliers.create(supplier) as unknown[]).map(mapSupplier);},
};
