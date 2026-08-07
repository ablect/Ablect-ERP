import type {

JournalEntry

}

from "../types/JournalEntry";

let entries:JournalEntry[]=[];

export const journalEntryService={

async getAll(){

return entries;

},

async create(

entry:JournalEntry,

){

entries=[

...entries,

entry,

];

return entries;

},

async update(

updated:JournalEntry,

){

entries=

entries.map(entry=>

entry.id===updated.id

?updated

:entry

);

return entries;

},

};