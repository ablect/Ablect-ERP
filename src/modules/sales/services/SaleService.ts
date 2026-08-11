import { requireDesktopApi } from "../../../lib/desktopApi";
import type { Sale } from "../types/Sale";
let drafts: Sale[] = [];
function mapSale(row: unknown): Sale { const sale=row as Record<string,unknown>; const id=String(sale.id); const status=String(sale.status??"DRAFT"); const paymentStatus=String(sale.payment_status??"UNPAID"); const createdAt=sale.created_at?new Date(String(sale.created_at)):new Date(); return { id, invoiceNumber:`INV-${id.padStart(5,"0")}`, customerId:sale.customer_id==null?"":String(sale.customer_id), date:createdAt.toISOString().slice(0,10), subtotal:Number(sale.subtotal??0), discountAmount:Number(sale.discount??0), taxAmount:Number(sale.tax??0), total:Number(sale.total??0), amountPaid:Number(sale.paid_amount??0), balanceDue:Math.max(0,Number(sale.total??0)-Number(sale.paid_amount??0)), paymentStatus:paymentStatus==="PAID"?"Paid":paymentStatus==="PARTIAL"?"Partially Paid":"Unpaid", paymentMethod:sale.payment_method==null?undefined:String(sale.payment_method), status:status==="COMPLETED"?"Completed":status==="CANCELLED"?"Cancelled":"Draft" }; }
export const saleService={
 async getAll():Promise<Sale[]>{ return (await requireDesktopApi().erp.sales.list()).map(mapSale); },
 async getById(id:string):Promise<Sale|undefined>{ const draft=drafts.find((sale)=>sale.id===id); return draft??(await this.getAll()).find((sale)=>sale.id===id); },
 async create(sale:Sale):Promise<Sale[]>{ if(drafts.some((item)=>item.id===sale.id))throw new Error("A sale with this ID already exists."); drafts=[...drafts,{...sale,status:"Draft"}]; return [...drafts]; },
 async update(updated:Sale):Promise<Sale[]>{ drafts=drafts.map((sale)=>sale.id===updated.id?updated:sale); return [...drafts]; },
 async delete(id:string):Promise<Sale[]>{ drafts=drafts.filter((sale)=>sale.id!==id); return [...drafts]; },
 consumeDraft(id:string):Sale|undefined{ const draft=drafts.find((sale)=>sale.id===id); drafts=drafts.filter((sale)=>sale.id!==id); return draft; },
};
