import {

useEffect

}

from "react";

import {

customerInvoiceService

}

from "../services/CustomerInvoiceService";

import {

useCustomerInvoiceStore

}

from "../store/CustomerInvoiceStore";

export function useLoadCustomerInvoices(){

const{

setInvoices,

}=

useCustomerInvoiceStore();

useEffect(()=>{

async function load(){

const invoices=

await customerInvoiceService.getAll();

setInvoices(

invoices,

);

}

load();

},[

setInvoices,

]);

}