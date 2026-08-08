import type {

StockLedgerEntry

}

from "../types/StockLedgerEntry";

let entries:StockLedgerEntry[]=[];

export const stockLedgerService={

async getAll(){

return entries;

},

async create(

entry:StockLedgerEntry,

){

entries=[

...entries,

entry,

];

return entries;

},

};