import {

useVat

}

from "./useVat";

export function useVatTotals(){

const{

transactions,

}=

useVat();

const outputVat=

transactions

.filter(

item=>

item.transactionType==="Sale",

)

.reduce(

(sum,item)=>

sum+item.vatAmount,

0,

);

const inputVat=

transactions

.filter(

item=>

item.transactionType==="Purchase",

)

.reduce(

(sum,item)=>

sum+item.vatAmount,

0,

);

return{

outputVat,

inputVat,

vatPayable:

outputVat-inputVat,

};

}