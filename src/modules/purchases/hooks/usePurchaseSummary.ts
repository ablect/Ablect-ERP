import {

usePurchasePayments

}

from "./usePurchasePayments";

import {

calculatePaidAmount

}

from "../utils/calculatePaidAmount";

import {

calculatePurchaseBalance

}

from "../utils/calculatePurchaseBalance";

import type {

Purchase

}

from "../types/Purchase";

export function usePurchaseSummary(

purchase:Purchase

){

const{

payments,

}=

usePurchasePayments();

const paid=

calculatePaidAmount(

purchase.id,

payments

);

const balance=

calculatePurchaseBalance(

purchase,

payments

);

return{

paid,

balance,

};

}