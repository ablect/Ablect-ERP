import {

calculateTax

}

from "../utils/calculateTax";

import {

isTaxExempt

}

from "../utils/isTaxExempt";

import {

isZeroRated

}

from "../utils/isZeroRated";

import type {

TaxCategory

}

from "../types/TaxCategory";

export function useTaxCalculation(){

function compute(

amount:number,

rate:number,

category:TaxCategory,

){

if(

isTaxExempt(

category,

)

){

return 0;

}

if(

isZeroRated(

category,

)

){

return 0;

}

return calculateTax(

amount,

rate,

);

}

return{

compute,

};

}