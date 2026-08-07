import {

supplierInvoiceService

}

from "../services/SupplierInvoiceService";

import {

useSupplierInvoiceStore

}

from "../store/SupplierInvoiceStore";

export function useApplySupplierPayment(){

async function apply(

invoiceId:string,

amount:number,

){

const invoices=

await supplierInvoiceService.getAll();

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

balance===0

){

status="Paid";

}

else if(

paid>0

){

status="Partially Paid";

}

return{

...invoice,

paid,

balance,

status,

};

});

useSupplierInvoiceStore

.getState()

.setInvoices(

updated,

);

}

return{

apply,

};

}