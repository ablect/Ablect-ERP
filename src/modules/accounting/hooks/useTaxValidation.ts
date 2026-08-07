import {

useTaxRates

}

from "./useTaxRates";

export function useTaxValidation(){

const{

rates,

}=

useTaxRates();

return{

hasActiveRate:

rates.some(

rate=>

rate.status==="Active",

),

};

}