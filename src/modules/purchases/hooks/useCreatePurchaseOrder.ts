import {

createPurchaseOrder

}

from "../utils/createPurchaseOrder";

import {

purchaseService

}

from "../services/PurchaseService";

import {

usePurchaseStore

}

from "../store/PurchaseStore";

export function useCreatePurchaseOrder(){

async function create(

poNumber:string,

supplierId:string,

orderDate:string,

expectedDate:string,

total:number,

){

const purchase=

createPurchaseOrder(

poNumber,

supplierId,

orderDate,

expectedDate,

total,

);

const orders=

await purchaseService.create(

purchase,

);

usePurchaseStore

.getState()

.setOrders(

orders,

);

}

return{

create,

};

}