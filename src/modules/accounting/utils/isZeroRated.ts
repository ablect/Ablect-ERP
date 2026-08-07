import type {

TaxCategory

}

from "../types/TaxCategory";

export function isZeroRated(

category:TaxCategory,

){

return category.zeroRated;

}