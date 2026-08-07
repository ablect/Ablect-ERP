import type {

AccountingLedgerEntry

}

from "../types/AccountingLedgerEntry";

let entries:AccountingLedgerEntry[]=[];

export const accountingLedgerService={

async getAll(){

return entries;

},

async create(

entry:AccountingLedgerEntry,

){

entries=[

...entries,

entry,

];

return entries;

},

};