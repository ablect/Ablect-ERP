import {

useEffect

}

from "react";

import {

purchaseService

}

from "../services/PurchaseService";

import {

usePurchaseStore

}

from "../store/PurchaseStore";

export function useLoadPurchaseOrders(){

const{

setOrders,

}=

usePurchaseStore();

useEffect(()=>{

async function load(){

const orders=

await purchaseService.getAll();

setOrders(

orders,

);

}

load();

},[

setOrders,

]);

}