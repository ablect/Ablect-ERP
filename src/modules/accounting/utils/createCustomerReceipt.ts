import type {

CustomerReceipt

}

from "../types/CustomerReceipt";

export function createCustomerReceipt(

receiptNumber:string,

invoiceId:string,

customerId:string,

receiptDate:string,

amount:number,

method:

|"Cash"

|"Bank Transfer"

|"Cheque"

|"POS"

|"Mobile Money",

reference:string,

remarks:string,

):CustomerReceipt{

return{

id:crypto.randomUUID(),

receiptNumber,

invoiceId,

customerId,

receiptDate,

amount,

method,

reference,

remarks,

};

}