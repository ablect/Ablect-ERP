import {

useEffect

}

from "react";

import {

purchaseRequisitionService

}

from "../services/PurchaseRequisitionService";

import {

usePurchaseRequisitionStore

}

from "../store/PurchaseRequisitionStore";

export function useLoadPurchaseRequisitions(){

const{

setRequisitions,

}=

usePurchaseRequisitionStore();

useEffect(()=>{

async function load(){

const requisitions=

await purchaseRequisitionService.getAll();

setRequisitions(

requisitions,

);

}

load();

},[

setRequisitions,

]);

}