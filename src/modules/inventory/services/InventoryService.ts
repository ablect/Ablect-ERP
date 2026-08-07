import type {

InventoryItem

}

from "../types/InventoryItem";

let items:InventoryItem[]=[];

export const inventoryService={

async getAll(){

return items;

},

async create(

item:InventoryItem,

){

items=[

...items,

item,

];

return items;

},

async delete(

id:string,

){

items=

items.filter(

item=>

item.id!==id,

);

return items;

},

};