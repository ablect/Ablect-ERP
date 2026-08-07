import type {

BankAccount

}

from "../types/BankAccount";

import type {

BankTransaction

}

from "../types/BankTransaction";

let accounts:BankAccount[]=[];

let transactions:BankTransaction[]=[];

export const bankReconciliationService={

async getAccounts(){

return accounts;

},

async getTransactions(){

return transactions;

},

async saveAccounts(

items:BankAccount[],

){

accounts=items;

},

async saveTransactions(

items:BankTransaction[],

){

transactions=items;

},

};