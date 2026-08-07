import type {

TaxCategory

}

from "../types/TaxCategory";

export function isTaxExempt(

category:TaxCategory,

){

return category.exempt;

}