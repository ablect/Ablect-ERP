import type {

CustomerInvoice

}

from "../types/CustomerInvoice";

export function createCustomerInvoice(

invoiceNumber:string,

customerId:string,

salesOrderId:string,

invoiceDate:string,

dueDate:string,

amount:number,

):CustomerInvoice{

return{

id:crypto.randomUUID(),

invoiceNumber,

customerId,

salesOrderId,

invoiceDate,

dueDate,

amount,

paid:0,

balance:amount,

status:"Pending",

};

}