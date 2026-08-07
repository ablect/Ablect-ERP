import {

taxService

}

from "../services/TaxService";

import {

useTaxRates

}

from "./useTaxRates";

export function useDeleteTaxRate(){

const{

rates,

setRates,

}=

useTaxRates();

async function remove(

id:string,

){

const updated=

rates.filter(

item=>

item.id!==id,

);

await taxService.saveRates(

updated,

);

setRates(

updated,

);

}

return{

remove,

};

}