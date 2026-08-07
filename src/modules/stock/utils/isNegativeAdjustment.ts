import type {

StockAdjustment

}

from "../types/StockAdjustment";

export function isNegativeAdjustment(

adjustment: StockAdjustment,

){

return adjustment.quantity<0;

}