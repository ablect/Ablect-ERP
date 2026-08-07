import {

customerInvoiceService

}

from "../services/CustomerInvoiceService";

import {

useCustomerInvoiceStore

}

from "../store/CustomerInvoiceStore";

export function useDeleteCustomerInvoice(){

async function remove(

id:string,

){

const invoices=

await customerInvoiceService.delete(

id,

);

useCustomerInvoiceStore

.getState()

.setInvoices(

invoices,

);

}

return{

remove,

};

}