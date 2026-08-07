import {
createBankAccount
}
from "../utils/createBankAccount";

import {
bankService
}
from "../services/BankService";

import {
useBankStore
}
from "../store/BankStore";

export function useCreateBankAccount(){

async function create(

bankName:string,

accountName:string,

accountNumber:string,

currency:string,

){

const account=

createBankAccount(

bankName,

accountName,

accountNumber,

currency,

);

const accounts=

await bankService.create(

account,

);

useBankStore

.getState()

.setAccounts(

accounts,

);

}

return{

create,

};

}