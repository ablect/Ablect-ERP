import {

useSupplierInvoices

}

from "./useSupplierInvoices";

export function useSupplierInvoiceStatistics(){

const{

invoices,

}=

useSupplierInvoices();

const pending=

invoices.filter(

i=>i.status==="Pending",

).length;

const paid=

invoices.filter(

i=>i.status==="Paid",

).length;

const overdue=

invoices.filter(

i=>i.status==="Overdue",

).length;

const totalAmount=

invoices.reduce(

(sum,i)=>

sum+i.amount,

0,

);

const outstanding=

invoices.reduce(

(sum,i)=>

sum+i.balance,

0,

);

return{

total:

invoices.length,

pending,

paid,

overdue,

totalAmount,

outstanding,

};

}