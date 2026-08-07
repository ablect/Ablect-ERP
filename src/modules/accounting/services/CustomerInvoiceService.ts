import type {

CustomerInvoice

}

from "../types/CustomerInvoice";

let invoices:CustomerInvoice[]=[];

export const customerInvoiceService={

async getAll(){

return invoices;

},

async create(

invoice:CustomerInvoice,

){

invoices=[

...invoices,

invoice,

];

return invoices;

},

async update(

updated:CustomerInvoice,

){

invoices=

invoices.map(invoice=>

invoice.id===updated.id

?updated

:invoice

);

return invoices;

},

async delete(

id:string,

){

invoices=

invoices.filter(

invoice=>

invoice.id!==id

);

return invoices;

},

};