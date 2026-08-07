import type {

Purchase

}

from "../types/Purchase";

export function calculateTotalPayables(

purchases: Purchase[]

){

return purchases.reduce(

(sum,purchase)=>

sum+

purchase.totalAmount,

0

);

}