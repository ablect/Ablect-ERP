import type {

JournalLine

}

from "../types/JournalLine";

export function createJournalLine(

journalEntryId:string,

accountId:string,

description:string,

debit:number,

credit:number,

):JournalLine{

return{

id:crypto.randomUUID(),

journalEntryId,

accountId,

description,

debit,

credit,

};

}