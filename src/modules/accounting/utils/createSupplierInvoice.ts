import type {

SupplierInvoice

}

from "../types/SupplierInvoice";

export function createSupplierInvoice(

invoiceNumber:string,

supplierId:string,

purchaseOrderId:string,

invoiceDate:string,

dueDate:string,

amount:number,

):SupplierInvoice{

return{

id:crypto.randomUUID(),

invoiceNumber,

supplierId,

purchaseOrderId,

invoiceDate,

dueDate,

amount,

paid:0,

balance:amount,

status:"Pending",

};

}