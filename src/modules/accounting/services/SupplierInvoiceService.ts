import type {

SupplierInvoice

}

from "../types/SupplierInvoice";

let invoices:SupplierInvoice[]=[];

export const supplierInvoiceService={

async getAll(){

return invoices;

},

async create(

invoice:SupplierInvoice,

){

invoices=[

...invoices,

invoice,

];

return invoices;

},

async update(

updated:SupplierInvoice,

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

invoices.filter(invoice=>

invoice.id!==id

);

return invoices;

},

};