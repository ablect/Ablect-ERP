import {

useTaxRates

}

from "./useTaxRates";

export function useDefaultTaxRate(){

const{

rates,

}=

useTaxRates();

return rates.find(

rate=>

rate.status==="Active",

);

}