import { usePurchasePayments }

from "./usePurchasePayments";

import {

calculatePurchaseBalance

}

from "../utils/calculatePurchaseBalance";

import type {

Purchase

}

from "../types/Purchase";

export function usePurchaseBalance(

purchase: Purchase

){

const{

payments,

}=

usePurchasePayments();

return{

balance:

calculatePurchaseBalance(

purchase,

payments

),

};

}