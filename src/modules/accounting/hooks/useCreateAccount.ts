import {

createAccount

}

from "../utils/createAccount";

import {

accountService

}

from "../services/AccountService";

import {

useAccountStore

}

from "../store/AccountStore";

export function useCreateAccount(){

async function create(

code:string,

name:string,

type:

|"Asset"

|"Liability"

|"Equity"

|"Revenue"

|"Expense",

parentId?:string,

){

const account=

createAccount(

code,

name,

type,

parentId,

);

const accounts=

await accountService.create(

account,

);

useAccountStore

.getState()

.setAccounts(

accounts,

);

}

return{

create,

};

}