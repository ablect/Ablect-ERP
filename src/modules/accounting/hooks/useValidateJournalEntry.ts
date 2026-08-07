import {

useJournalTotals

}

from "./useJournalTotals";

export function useValidateJournalEntry(

journalEntryId:string,

){

const{

debit,

credit,

balanced,

}=

useJournalTotals(

journalEntryId,

);

return{

debit,

credit,

balanced,

canPost:

balanced&&debit>0,

};

}