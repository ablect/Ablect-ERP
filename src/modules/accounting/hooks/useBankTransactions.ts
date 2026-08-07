import {

useBankReconciliationStore

}

from "../store/BankReconciliationStore";

export function useBankTransactions(){

const{

transactions,

setTransactions,

}=

useBankReconciliationStore();

return{

transactions,

setTransactions,

};

}