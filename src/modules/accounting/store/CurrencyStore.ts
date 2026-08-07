import { create }

from "zustand";

import type {

Currency

}

from "../types/Currency";

import type {

ExchangeRate

}

from "../types/ExchangeRate";

type CurrencyState={

currencies:Currency[];

exchangeRates:ExchangeRate[];

setCurrencies:(

currencies:Currency[],

)=>void;

setExchangeRates:(

rates:ExchangeRate[],

)=>void;

};

export const useCurrencyStore=

create<CurrencyState>((set)=>({

currencies:[],

exchangeRates:[],

setCurrencies(currencies){

set({currencies});

},

setExchangeRates(exchangeRates){

set({exchangeRates});

},

}));