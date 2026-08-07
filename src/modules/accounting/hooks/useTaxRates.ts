import {

useTaxStore

}

from "../store/TaxStore";

export function useTaxRates(){

const{

rates,

setRates,

}=

useTaxStore();

return{

rates,

setRates,

};

}