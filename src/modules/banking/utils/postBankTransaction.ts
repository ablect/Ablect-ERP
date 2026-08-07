import {
createJournalEntry
}
from "../../accounting/utils/createJournalEntry";

import {
journalService
}
from "../../accounting/services/JournalService";

export async function postBankTransaction(

description:string,

amount:number,

reference:string,

){

await journalService.create(

createJournalEntry(

description,

"Bank",

"Cash",

amount,

reference,

),

);

}