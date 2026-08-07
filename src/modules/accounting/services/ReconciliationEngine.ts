import type {

BankTransaction

}

from "../types/BankTransaction";

import type {

LedgerEntry

}

from "../types/LedgerEntry";

import type {

ReconciliationResult

}

from "../types/ReconciliationResult";

export function reconcile(

ledger:LedgerEntry[],

bank:BankTransaction[],

):ReconciliationResult[]{

return bank.map(item=>{

const match=

ledger.find(

entry=>

entry.reference===

item.reference

);

return{

transactionId:item.id,

ledgerReference:

match?.reference??

"",

bankReference:

item.reference,

matched:!!match,

difference:

match

?Math.abs(

match.debit-

item.debit,

)

:0,

remarks:

match

?"Matched"

:"Missing Ledger Entry",

};

});

}