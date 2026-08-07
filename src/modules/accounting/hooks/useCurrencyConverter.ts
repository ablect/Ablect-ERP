import {

convertCurrency

}

from "../utils/convertCurrency";

export function useCurrencyConverter(){

function convert(

amount:number,

rate:number,

){

return convertCurrency(

amount,

rate,

);

}

return{

convert,

};

}