import {

useJournalLines

}

from "./useJournalLines";

export function useJournalTotals(

journalEntryId:string,

){

const{

lines,

}=

useJournalLines();

const current=

lines.filter(

line=>

line.journalEntryId===journalEntryId,

);

const debit=

current.reduce(

(sum,line)=>

sum+line.debit,

0,

);

const credit=

current.reduce(

(sum,line)=>

sum+line.credit,

0,

);

return{

debit,

credit,

balanced:

debit===credit,

};

}