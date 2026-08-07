import type {

AccountingLedgerEntry

}

from "../types/AccountingLedgerEntry";

export function createAccountingLedgerEntry(

reference:string,

referenceId:string,

account:string,

debit:number,

credit:number,

description:string,

):AccountingLedgerEntry{

return{

id:crypto.randomUUID(),

date:new Date().toISOString(),

reference,

referenceId,

account,

debit,

credit,

description,

};

}