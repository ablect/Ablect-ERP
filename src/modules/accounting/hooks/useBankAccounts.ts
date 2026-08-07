import {

useBankReconciliationStore

}

from "../store/BankReconciliationStore";

export function useBankAccounts(){

const{

accounts,

setAccounts,

}=

useBankReconciliationStore();

return{

accounts,

setAccounts,

};

}