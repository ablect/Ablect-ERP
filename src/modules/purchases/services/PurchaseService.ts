import type { Purchase } from "../types/Purchase";
import { requireDesktopApi } from "../../../lib/desktopApi";
type PurchaseInput=Purchase&{warehouseId?:string;expectedDate?:string;notes?:string;tax?:number;userId?:string;lines?:Array<{productId:string;quantity:number;unitCost:number}>};
function mapPurchase(row:unknown):Purchase{const p=row as Record<string,unknown>;return{id:String(p.id),supplierId:String(p.supplier_id??""),invoiceNumber:String(p.po_number??""),purchaseDate:new Date(String(p.order_date??p.created_at)),totalAmount:Number(p.total??0),status:p.status==="RECEIVED"?"Completed":"Draft",createdAt:new Date(String(p.created_at)),updatedAt:new Date(String(p.updated_at??p.created_at))};}
export const purchaseService={
 async getAll():Promise<Purchase[]>{return (await requireDesktopApi().erp.purchases.list()).map(mapPurchase);},
 async create(purchase:PurchaseInput){if(!purchase.warehouseId||!purchase.lines?.length)throw new Error("A warehouse and purchase lines are required.");await requireDesktopApi().erp.purchases.create({number:purchase.invoiceNumber,supplierId:purchase.supplierId,warehouseId:purchase.warehouseId,orderDate:purchase.purchaseDate,expectedDate:purchase.expectedDate,notes:purchase.notes,tax:purchase.tax,userId:purchase.userId,lines:purchase.lines});return this.getAll();},
 async update(_updated:Purchase){return this.getAll();},
 async delete(id:string){throw new Error(`Purchase order ${id} deletion is disabled after MySQL persistence.`);},
};
