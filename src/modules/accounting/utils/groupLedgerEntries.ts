import type {

AccountingLedgerEntry

}

from "../types/AccountingLedgerEntry";

export function groupLedgerEntries(

entries:AccountingLedgerEntry[],

){

const map=new Map();

for(

const entry of entries

){

const current=

map.get(

entry.account,

)??{

account:entry.account,

debit:0,

credit:0,

};

current.debit+=entry.debit;

current.credit+=entry.credit;

map.set(

entry.account,

current,

);

}

return[

...map.values(),

];

}