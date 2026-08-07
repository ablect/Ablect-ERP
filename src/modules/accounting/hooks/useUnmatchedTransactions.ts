import {

useReconciliationResultStore

}

from "../store/ReconciliationResultStore";

export function useUnmatchedTransactions(){

const{

results,

}=

useReconciliationResultStore();

return results.filter(

item=>

!item.matched,

);

}