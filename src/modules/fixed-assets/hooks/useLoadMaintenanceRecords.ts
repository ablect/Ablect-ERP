import {

useEffect

}

from "react";

import {

maintenanceService

}

from "../services/MaintenanceService";

import {

useMaintenanceStore

}

from "../store/MaintenanceStore";

export function useLoadMaintenanceRecords(){

const{

setRecords,

}=

useMaintenanceStore();

useEffect(()=>{

async function load(){

const records=

await maintenanceService.getAll();

setRecords(

records,

);

}

load();

},[

setRecords,

]);

}