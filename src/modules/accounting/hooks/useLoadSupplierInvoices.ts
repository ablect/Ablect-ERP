import {

useEffect

}

from "react";

import {

supplierInvoiceService

}

from "../services/SupplierInvoiceService";

import {

useSupplierInvoiceStore

}

from "../store/SupplierInvoiceStore";

export function useLoadSupplierInvoices(){

const{

setInvoices,

}=

useSupplierInvoiceStore();

useEffect(()=>{

async function load(){

const invoices=

await supplierInvoiceService.getAll();

setInvoices(

invoices,

);

}

load();

},[

setInvoices,

]);

}