import type { Purchase } from "../types/Purchase";

type PurchaseInput = Purchase & { warehouseId?: string; expectedDate?: string; notes?: string; tax?: number; userId?: string; lines?: Array<{ productId:string; quantity:number; unitCost:number }> };
function api(){if(!window.ablectDesktop?.erp?.purchases)throw new Error("Desktop data bridge is unavailable.");return window.ablectDesktop.erp.purchases;}
export const purchaseService={
 async getAll():Promise<Purchase[]>{const rows=await api().list() as Array<Record<string,unknown>>;return rows.map((row)=>({id:String(row.id),supplierId:String(row.supplier_id),invoiceNumber:String(row.po_number),purchaseDate:new Date(String(row.order_date)),totalAmount:Number(row.total||0),status:row.status==="RECEIVED"?"Completed":"Draft",createdAt:new Date(String(row.created_at)),updatedAt:new Date(String(row.created_at))}));},
 async create(purchase:PurchaseInput){if(!purchase.warehouseId||!purchase.lines?.length)throw new Error("A warehouse and purchase lines are required.");await api().create({number:purchase.invoiceNumber,supplierId:purchase.supplierId,warehouseId:purchase.warehouseId,orderDate:purchase.purchaseDate,expectedDate:purchase.expectedDate,notes:purchase.notes,tax:purchase.tax,userId:purchase.userId,lines:purchase.lines});return this.getAll();},
 async update(updated:Purchase){return this.getAll();},
 async delete(id:string){throw new Error(`Purchase order ${id} deletion is disabled after MySQL persistence.`);},
};
