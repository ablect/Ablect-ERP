import {

useEffect

}

from "react";

import {

stockMovementService

}

from "../services/StockMovementService";

import {

useStockMovementStore

}

from "../store/StockMovementStore";

export function useLoadStockMovements(){

const{

setMovements,

}=

useStockMovementStore();

useEffect(()=>{

async function load(){

const movements=

await stockMovementService.getAll();

setMovements(

movements,

);

}

load();

},[

setMovements,

]);

}