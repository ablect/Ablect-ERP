import type {

LedgerEntry

}

from "../types/LedgerEntry";

import {

defaultLedgerEntries

}

from "../utils/defaultLedgerEntries";

let entries=

defaultLedgerEntries;

export const ledgerService={

async getAll(){

return entries;

},

async create(

entry:LedgerEntry,

){

entries=[

...entries,

entry,

];

return entries;

},

};