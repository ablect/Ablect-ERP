import {

useReconciliationResultStore

}

from "../store/ReconciliationResultStore";

export function useMatchedTransactions(){

const{

results,

}=

useReconciliationResultStore();

return results.filter(

item=>

item.matched,

);

}