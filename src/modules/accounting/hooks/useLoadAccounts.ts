import {

useEffect

}

from "react";

import {

accountService

}

from "../services/AccountService";

import {

useAccountStore

}

from "../store/AccountStore";

export function useLoadAccounts(){

const{

setAccounts,

}=

useAccountStore();

useEffect(()=>{

async function load(){

const accounts=

await accountService.getAll();

setAccounts(

accounts,

);

}

load();

},[

setAccounts,

]);

}