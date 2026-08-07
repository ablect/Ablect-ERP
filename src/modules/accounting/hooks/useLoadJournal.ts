import {

useEffect

}

from "react";

import {

journalService

}

from "../services/JournalService";

import {

useJournalStore

}

from "../store/JournalStore";

export function useLoadJournal(){

const{

setEntries,

}=

useJournalStore();

useEffect(()=>{

async function load(){

const entries=

await journalService.getAll();

setEntries(

entries,

);

}

load();

},[

setEntries,

]);

}