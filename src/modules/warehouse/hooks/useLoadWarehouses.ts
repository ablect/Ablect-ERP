import {

useEffect

}

from "react";

import {

warehouseService

}

from "../services/WarehouseService";

import {

useWarehouseStore

}

from "../store/WarehouseStore";

export function useLoadWarehouses(){

const{

setWarehouses,

}=

useWarehouseStore();

useEffect(()=>{

async function load(){

const warehouses=

await warehouseService.getAll();

setWarehouses(

warehouses,

);

}

load();

},[

setWarehouses,

]);

}