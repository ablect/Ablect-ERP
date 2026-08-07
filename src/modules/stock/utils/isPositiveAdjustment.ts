import type {

StockAdjustment

}

from "../types/StockAdjustment";

export function isPositiveAdjustment(

adjustment: StockAdjustment,

){

return adjustment.quantity>0;

}