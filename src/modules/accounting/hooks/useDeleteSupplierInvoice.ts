import {

supplierInvoiceService

}

from "../services/SupplierInvoiceService";

import {

useSupplierInvoiceStore

}

from "../store/SupplierInvoiceStore";

export function useDeleteSupplierInvoice(){

async function remove(

id:string,

){

const invoices=

await supplierInvoiceService.delete(

id,

);

useSupplierInvoiceStore

.getState()

.setInvoices(

invoices,

);

}

return{

remove,

};

}