import { purchasePaymentService }

from "../services/PurchasePaymentService";

import { usePurchasePaymentStore }

from "../store/PurchasePaymentStore";

import type { PurchasePayment }

from "../types/PurchasePayment";

export function useRecordPurchasePayment(){

const{

addPayment,

}=

usePurchasePaymentStore();

async function record(

payment:PurchasePayment

){

await purchasePaymentService.create(

payment

);

addPayment(payment);

}

return{

record,

};

}