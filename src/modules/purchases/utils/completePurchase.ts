import {

purchaseStockService

}

from "../../stock/services/PurchaseStockService";

import type {

PurchaseItem

}

from "../types/PurchaseItem";

export function completePurchase(

reference:string,

items:PurchaseItem[]

){

items.forEach(item=>{

purchaseStockService.receive(

item.productId,

reference,

item.quantity,

item.quantity,

);

});

}