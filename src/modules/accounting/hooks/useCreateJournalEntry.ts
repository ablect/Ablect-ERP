import {

createJournalEntry

}

from "../utils/createJournalEntry";

import {

journalEntryService

}

from "../services/JournalEntryService";

import {

useJournalEntryStore

}

from "../store/JournalEntryStore";

export function useCreateJournalEntry(){

async function create(

journalNumber:string,

reference:string,

description:string,

){

const entry=

createJournalEntry(

journalNumber,

reference,

description,

);

const entries=

await journalEntryService.create(

entry,

);

useJournalEntryStore

.getState()

.setEntries(

entries,

);

return entry;

}

return{

create,

};

}