import {

createLedgerEntry

}

from "../utils/createLedgerEntry";

import {

ledgerService

}

from "../services/LedgerService";

import {

useLedgerStore

}

from "../store/LedgerStore";

export function useCreateLedgerEntry(){

async function create(

account:string,

description:string,

debit:number,

credit:number,

reference:string,

){

const entry=

createLedgerEntry(

account,

description,

debit,

credit,

reference,

);

const entries=

await ledgerService.create(

entry,

);

useLedgerStore

.getState()

.setEntries(

entries,

);

}

return{

create,

};

}