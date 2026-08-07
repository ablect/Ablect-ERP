import {

usePurchaseBalance

}

from "./usePurchaseBalance";

import {

getPurchaseStatus

}

from "../utils/getPurchaseStatus";

import type {

Purchase

}

from "../types/Purchase";

export function usePurchaseStatus(

purchase:Purchase

){

const{

balance,

}=

usePurchaseBalance(

purchase

);

return{

status:

getPurchaseStatus(

purchase.totalAmount,

balance

),

};

}