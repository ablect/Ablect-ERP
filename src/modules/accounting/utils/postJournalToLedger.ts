import {
createLedgerEntry
}
from "./createLedgerEntry";

import {
ledgerService
}
from "../services/LedgerService";

export async function postJournalToLedger(

description:string,

debit:string,

credit:string,

amount:number,

reference:string,

){

await ledgerService.create(

createLedgerEntry(

debit,

description,

amount,

0,

reference,

),

);

await ledgerService.create(

createLedgerEntry(

credit,

description,

0,

amount,

reference,

),

);

}