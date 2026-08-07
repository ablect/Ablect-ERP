import {

customerInvoiceService

}

from "../services/CustomerInvoiceService";

import {

useCustomerInvoiceStore

}

from "../store/CustomerInvoiceStore";

export function useApplyCustomerReceipt(){

async function apply(

invoiceId:string,

amount:number,

){

const invoices=

await customerInvoiceService.getAll();

const updated=

invoices.map(invoice=>{

if(

invoice.id!==invoiceId

){

return invoice;

}

const paid=

invoice.paid+

amount;

const balance=

Math.max(

invoice.amount-paid,

0,

);

let status=invoice.status;

if(

balance===0){

status="Paid";

}else if(

paid>0){

status="Partially Paid";

}

return{

...invoice,

paid,

balance,

status,

};

});

useCustomerInvoiceStore

.getState()

.setInvoices(

updated,

);

}

return{

apply,

};

}