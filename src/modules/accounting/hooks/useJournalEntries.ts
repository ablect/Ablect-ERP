import {

useJournalEntryStore

}

from "../store/JournalEntryStore";

export function useJournalEntries(){

return useJournalEntryStore();

}