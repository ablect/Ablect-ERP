import type {

BankAccount

}

from "../types/BankAccount";

export function createBankAccount(

bankName:string,

accountName:string,

accountNumber:string,

currency:string,

):BankAccount{

return{

id:crypto.randomUUID(),

bankName,

accountName,

accountNumber,

currency,

balance:0,

active:true,

};

}