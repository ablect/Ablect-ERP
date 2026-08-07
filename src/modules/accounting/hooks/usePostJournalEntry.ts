import {

journalEntryService

}

from "../services/JournalEntryService";

import {

useJournalEntryStore

}

from "../store/JournalEntryStore";

export function usePostJournalEntry(){

async function post(

id:string,

){

const entries=

await journalEntryService.getAll();

const updated=

entries.map(entry=>

entry.id===id

?{

...entry,

status:"Posted",

}

:entry

);

useJournalEntryStore

.getState()

.setEntries(

updated,

);

}

return{

post,

};

}