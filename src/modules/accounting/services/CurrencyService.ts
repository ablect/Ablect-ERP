import type {

Currency

}

from "../types/Currency";

import type {

ExchangeRate

}

from "../types/ExchangeRate";

let currencies:Currency[]=[];

let exchangeRates:ExchangeRate[]=[];

export const currencyService={

async getCurrencies(){

return currencies;

},

async getExchangeRates(){

return exchangeRates;

},

async saveCurrencies(

items:Currency[],

){

currencies=items;

},

async saveExchangeRates(

items:ExchangeRate[],

){

exchangeRates=items;

},

};