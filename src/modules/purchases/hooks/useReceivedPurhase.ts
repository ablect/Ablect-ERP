import {

useReceiveGoods

}

from "./useReceiveGoods";

import {

useInventoryReceipt

}

from "./useInventoryReceipt";

import {

useWarehouseReceipt

}

from "./useWarehouseReceipt";

import {

usePurchaseOrderReceiving

}

from "./usePurchaseOrderReceiving";

import {

useStockIn

}

from "./useStockIn";

export function useReceivePurchase(){

const{

receive,

}=

useReceiveGoods();

const{

receive:receiveInventory,

}=

useInventoryReceipt();

const{

receive:receiveWarehouse,

}=

useWarehouseReceipt();

const{

receive:receivePurchaseOrder,

}=

usePurchaseOrderReceiving();

const{

stockIn,

}=

useStockIn();

async function complete(

grnId:string,

purchaseOrderId:string,

productId:string,

warehouseId:string,

quantity:number,

){

await receive(

grnId,

);

receiveInventory(

productId,

quantity,

);

receiveWarehouse(

warehouseId,

quantity,

);

await receivePurchaseOrder(

purchaseOrderId,

);

await stockIn(

productId,

warehouseId,

quantity,

grnId,

);

}

return{

complete,

};

}