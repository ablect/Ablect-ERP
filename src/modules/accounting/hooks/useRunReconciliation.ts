import {

useAccountingLedger

}

from "./useAccountingLedger";

import {

useBankTransactions

}

from "./useBankTransactions";

import {

reconcile

}

from "../services/ReconciliationEngine";

import {

useReconciliationResultStore

}

from "../store/ReconciliationResultStore";

export function useRunReconciliation(){

const{

entries,

}=

useAccountingLedger();

const{

transactions,

}=

useBankTransactions();

function run(){

const results=

reconcile(

entries,

transactions,

);

useReconciliationResultStore

.getState()

.setResults(

results,

);

}

return{

run,

};

}