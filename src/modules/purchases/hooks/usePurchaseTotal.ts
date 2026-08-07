import {

calculatePurchaseTotal

}

from "../utils/calculatePurchaseTotal";

import type {

PurchaseItem

}

from "../types/PurchaseItem";

export function usePurchaseTotal(

items:PurchaseItem[]

){

return{

total:

calculatePurchaseTotal(

items

),

};

}