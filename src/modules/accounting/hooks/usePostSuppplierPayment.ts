import {

accountingLedgerService

}

from "../services/AccountingLedgerService";

import {

createAccountingLedgerEntry

}

from "../utils/createAccountingLedgerEntry";

import {

useAccountingLedgerStore

}

from "../store/AccountingLedgerStore";

export function usePostSupplierPayment(){

async function post(

paymentId:string,

amount:number,

){

const entry=

createAccountingLedgerEntry(

"Supplier Payment",

paymentId,

"Accounts Payable",

amount,

0,

"Supplier payment posted",

);

const entries=

await accountingLedgerService.create(

entry,

);

useAccountingLedgerStore

.getState()

.setEntries(

entries,

);

}

return{

post,

};

}