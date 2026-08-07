import type {

SupplierPayment

}

from "../types/SupplierPayment";

export function createSupplierPayment(

paymentNumber:string,

invoiceId:string,

supplierId:string,

paymentDate:string,

amount:number,

method:

|"Cash"

|"Bank Transfer"

|"Cheque"

|"Mobile Money",

reference:string,

remarks:string,

):SupplierPayment{

return{

id:crypto.randomUUID(),

paymentNumber,

invoiceId,

supplierId,

paymentDate,

amount,

method,

reference,

remarks,

};

}