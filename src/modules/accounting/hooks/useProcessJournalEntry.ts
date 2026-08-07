import {

usePostJournalEntry

}

from "./usePostJournalEntry";

import {

useValidateJournalEntry

}

from "./useValidateJournalEntry";

export function useProcessJournalEntry(

journalEntryId:string,

){

const{

canPost,

}=

useValidateJournalEntry(

journalEntryId,

);

const{

post,

}=

usePostJournalEntry();

async function process(){

if(

!canPost

){

throw new Error(

"Journal Entry is not balanced."

);

}

await post(

journalEntryId,

);

}

return{

process,

};

}