import {

createCustomerReceipt

}

from "../utils/createCustomerReceipt";

import {

customerReceiptService

}

from "../services/CustomerReceiptService";

import {

useCustomerReceiptStore

}

from "../store/CustomerReceiptStore";

export function useCreateCustomerReceipt(){

async function create(

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

){

const receipt=

createCustomerReceipt(

receiptNumber,

invoiceId,

customerId,

receiptDate,

amount,

method,

reference,

remarks,

);

const receipts=

await customerReceiptService.create(

receipt,

);

useCustomerReceiptStore

.getState()

.setReceipts(

receipts,

);

}

return{

create,

};

}