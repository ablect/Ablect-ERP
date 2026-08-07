import type {

LedgerEntry

}

from "../types/LedgerEntry";

export function createLedgerEntry(

account:string,

description:string,

debit:number,

credit:number,

reference:string,

):LedgerEntry{

return{

id:crypto.randomUUID(),

account,

description,

debit,

credit,

reference,

date:new Date()

.toISOString(),

};

}