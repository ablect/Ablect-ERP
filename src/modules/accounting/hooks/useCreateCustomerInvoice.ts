import {

createCustomerInvoice

}

from "../utils/createCustomerInvoice";

import {

customerInvoiceService

}

from "../services/CustomerInvoiceService";

import {

useCustomerInvoiceStore

}

from "../store/CustomerInvoiceStore";

export function useCreateCustomerInvoice(){

async function create(

invoiceNumber:string,

customerId:string,

salesOrderId:string,

invoiceDate:string,

dueDate:string,

amount:number,

){

const invoice=

createCustomerInvoice(

invoiceNumber,

customerId,

salesOrderId,

invoiceDate,

dueDate,

amount,

);

const invoices=

await customerInvoiceService.create(

invoice,

);

useCustomerInvoiceStore

.getState()

.setInvoices(

invoices,

);

}

return{

create,

};

}