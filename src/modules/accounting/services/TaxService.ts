import type {

TaxRate

}

from "../types/TaxRate";

import type {

TaxCategory

}

from "../types/TaxCategory";

let rates:TaxRate[]=[];

let categories:TaxCategory[]=[];

export const taxService={

async getRates(){

return rates;

},

async getCategories(){

return categories;

},

async saveRates(

items:TaxRate[],

){

rates=items;

return rates;

},

async saveCategories(

items:TaxCategory[],

){

categories=items;

return categories;

},

};