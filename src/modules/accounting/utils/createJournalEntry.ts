import type {

JournalEntry

}

from "../types/JournalEntry";

export function createJournalEntry(

journalNumber:string,

reference:string,

description:string,

):JournalEntry{

return{

id:crypto.randomUUID(),

journalNumber,

date:new Date().toISOString(),

reference,

description,

status:"Draft",

};

}