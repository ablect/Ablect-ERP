import {

useEffect

}

from "react";

import {

supplierPaymentService

}

from "../services/SupplierPaymentService";

import {

useSupplierPaymentStore

}

from "../store/SupplierPaymentStore";

export function useLoadSupplierPayments(){

const{

setPayments,

}=

useSupplierPaymentStore();

useEffect(()=>{

async function load(){

const payments=

await supplierPaymentService.getAll();

setPayments(

payments,

);

}

load();

},[

setPayments,

]);

}