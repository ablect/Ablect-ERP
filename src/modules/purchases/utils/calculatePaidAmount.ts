import type {

PurchasePayment

}

from "../types/PurchasePayment";

export function calculatePaidAmount(

purchaseId:string,

payments:PurchasePayment[]

){

return payments

.filter(

payment=>

payment.purchaseId===purchaseId

)

.reduce(

(sum,payment)=>

sum+

payment.amount,

0

);

}