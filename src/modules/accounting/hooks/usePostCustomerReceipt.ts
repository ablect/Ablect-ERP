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

export function usePostCustomerReceipt(){

async function post(

receiptId:string,

amount:number,

){

const entry=

createAccountingLedgerEntry(

"Customer Receipt",

receiptId,

"Accounts Receivable",

0,

amount,

"Customer payment received",

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