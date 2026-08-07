import {

createInventoryItem

}

from "../utils/createInventoryItem";

import {

inventoryService

}

from "../services/InventoryService";

import {

useInventoryStore

}

from "../store/InventoryStore";

export function useCreateInventoryItem(){

async function create(

sku:string,

itemName:string,

category:string,

warehouse:string,

unit:string,

quantity:number,

reorderLevel:number,

unitCost:number,

sellingPrice:number,

){

const item=

createInventoryItem(

sku,

itemName,

category,

warehouse,

unit,

quantity,

reorderLevel,

unitCost,

sellingPrice,

);

const items=

await inventoryService.create(

item,

);

useInventoryStore

.getState()

.setItems(

items,

);

}

return{

create,

};

}