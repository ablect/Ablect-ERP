import {

useEffect

}

from "react";

import {

depreciationService

}

from "../services/DepreciationService";

import {

useDepreciationStore

}

from "../store/DepreciationStore";

export function useLoadDepreciationRecords(){

const{

setRecords,

}=

useDepreciationStore();

useEffect(()=>{

async function load(){

const records=

await depreciationService.getAll();

setRecords(

records,

);

}

load();

},[

setRecords,

]);

}