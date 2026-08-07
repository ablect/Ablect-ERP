import {

useEffect

}

from "react";

import {

inventoryService

}

from "../services/InventoryService";

import {

useInventoryStore

}

from "../store/InventoryStore";

export function useLoadInventory(){

const{

setItems,

}=

useInventoryStore();

useEffect(()=>{

async function load(){

const items=

await inventoryService.getAll();

setItems(

items,

);

}

load();

},[

setItems,

]);

}