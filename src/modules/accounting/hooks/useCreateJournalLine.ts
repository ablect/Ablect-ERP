import {

createJournalLine

}

from "../utils/createJournalLine";

import {

journalLineService

}

from "../services/JournalLineService";

import {

useJournalLineStore

}

from "../store/JournalLineStore";

export function useCreateJournalLine(){

async function create(

journalEntryId:string,

accountId:string,

description:string,

debit:number,

credit:number,

){

const line=

createJournalLine(

journalEntryId,

accountId,

description,

debit,

credit,

);

const lines=

await journalLineService.create(

line,

);

useJournalLineStore

.getState()

.setLines(

lines,

);

}

return{

create,

};

}