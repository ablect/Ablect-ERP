import {

useCurrencyStore

}

from "../store/CurrencyStore";

export function useCurrencies(){

const{

currencies,

setCurrencies,

}=

useCurrencyStore();

return{

currencies,

setCurrencies,

};

}