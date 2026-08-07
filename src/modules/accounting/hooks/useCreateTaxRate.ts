import {

taxService

}

from "../services/TaxService";

import {

useTaxRates

}

from "./useTaxRates";

import type {

TaxRate

}

from "../types/TaxRate";

export function useCreateTaxRate(){

const{

rates,

setRates,

}=

useTaxRates();

async function create(

rate:TaxRate,

){

const updated=[

...rates,

rate,

];

await taxService.saveRates(

updated,

);

setRates(

updated,

);

}

return{

create,

};

}