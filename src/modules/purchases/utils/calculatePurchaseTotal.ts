import type {

PurchaseItem

}

from "../types/PurchaseItem";

export function calculatePurchaseTotal(

items: PurchaseItem[]

){

return items.reduce(

(total,item)=>

total+

item.total,

0

);

}