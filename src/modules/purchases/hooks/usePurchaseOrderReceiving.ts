import {

purchaseService

}

from "../services/PurchaseService";

import {

usePurchaseStore

}

from "../store/PurchaseStore";

export function usePurchaseOrderReceiving(){

async function receive(

purchaseOrderId:string,

){

const orders=

await purchaseService.getAll();

const updated=

orders.map(order=>

order.id===purchaseOrderId

?{

...order,

status:"Received",

}

:order

);

usePurchaseStore

.getState()

.setOrders(

updated,

);

}

return{

receive,

};

}