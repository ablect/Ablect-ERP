import {

useEffect

}

from "react";

import {

employeeAssetService

}

from "../services/EmployeeAssetService";

import {

useEmployeeAssetStore

}

from "../store/EmployeeAssetStore";

export function useLoadEmployeeAssets(){

const{

setAssets,

}=

useEmployeeAssetStore();

useEffect(()=>{

async function load(){

const assets=

await employeeAssetService.getAll();

setAssets(

assets,

);

}

load();

},[

setAssets,

]);

}