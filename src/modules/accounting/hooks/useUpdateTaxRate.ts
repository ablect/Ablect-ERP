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

export function useUpdateTaxRate(){

const{

rates,

setRates,

}=

useTaxRates();

async function update(

rate:TaxRate,

){

const updated=

rates.map(item=>

item.id===rate.id

?rate

:item

);

await taxService.saveRates(

updated,

);

setRates(

updated,

);

}

return{

update,

};

}