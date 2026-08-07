import {

useCustomerInvoices

}

from "./useCustomerInvoices";

export function useCustomerInvoiceStatistics(){

const{

invoices,

}=

useCustomerInvoices();

const pending=

invoices.filter(

invoice=>invoice.status==="Pending",

).length;

const paid=

invoices.filter(

invoice=>invoice.status==="Paid",

).length;

const overdue=

invoices.filter(

invoice=>invoice.status==="Overdue",

).length;

const totalAmount=

invoices.reduce(

(sum,invoice)=>

sum+invoice.amount,

0,

);

const receivable=

invoices.reduce(

(sum,invoice)=>

sum+invoice.balance,

0,

);

return{

total:

invoices.length,

pending,

paid,

overdue,

totalAmount,

receivable,

};

}