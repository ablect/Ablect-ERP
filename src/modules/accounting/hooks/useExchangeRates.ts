import {

useCurrencyStore

}

from "../store/CurrencyStore";

export function useExchangeRates(){

const{

exchangeRates,

setExchangeRates,

}=

useCurrencyStore();

return{

exchangeRates,

setExchangeRates,

};

}