import {

purchaseService

}

from "../services/PurchaseService";

import {

usePurchaseStore

}

from "../store/PurchaseStore";

export function useDeletePurchaseOrder(){

async function remove(

id:string,

){

const orders=

await purchaseService.delete(

id,

);

usePurchaseStore

.getState()

.setOrders(

orders,

);

}

return{

remove,

};

}