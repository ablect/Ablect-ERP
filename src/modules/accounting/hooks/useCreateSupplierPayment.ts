import {

createSupplierPayment

}

from "../utils/createSupplierPayment";

import {

supplierPaymentService

}

from "../services/SupplierPaymentService";

import {

useSupplierPaymentStore

}

from "../store/SupplierPaymentStore";

export function useCreateSupplierPayment(){

async function create(

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

){

const payment=

createSupplierPayment(

paymentNumber,

invoiceId,

supplierId,

paymentDate,

amount,

method,

reference,

remarks,

);

const payments=

await supplierPaymentService.create(

payment,

);

useSupplierPaymentStore

.getState()

.setPayments(

payments,

);

}

return{

create,

};

}