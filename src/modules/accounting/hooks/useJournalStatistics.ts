import {

useJournalEntries

}

from "./useJournalEntries";

export function useJournalStatistics(){

const{

entries,

}=

useJournalEntries();

return{

draft:

entries.filter(

entry=>

entry.status==="Draft",

).length,

posted:

entries.filter(

entry=>

entry.status==="Posted",

).length,

total:

entries.length,

};

}