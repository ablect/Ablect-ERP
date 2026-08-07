import {

useEffect

}

from "react";

import {

ledgerService

}

from "../services/LedgerService";

import {

useLedgerStore

}

from "../store/LedgerStore";

export function useLoadLedger(){

const{

setEntries,

}=

useLedgerStore();

useEffect(()=>{

async function load(){

const entries=

await ledgerService.getAll();

setEntries(

entries,

);

}

load();

},[

setEntries,

]);

}