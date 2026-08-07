import {

useVat

}

from "./useVat";

export function useVatStatistics(){

const{

transactions,

}=

useVat();

return{

transactions:

transactions.length,

pending:

transactions.filter(

item=>

item.status==="Pending",

).length,

filed:

transactions.filter(

item=>

item.status==="Filed",

).length,

};

}