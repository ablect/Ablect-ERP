import type {
JournalEntry
}
from "../types/JournalEntry";

import {
defaultJournalEntries
}
from "../utils/defaultJournalEntries";

let entries=defaultJournalEntries;

export const journalService={

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

};