import {

inventoryService

}

from "../services/InventoryService";

import {

useInventoryStore

}

from "../store/InventoryStore";

export function useDeleteInventoryItem(){

async function remove(

id:string,

){

const items=

await inventoryService.delete(

id,

);

useInventoryStore

.getState()

.setItems(

items,

);

}

return{

remove,

};

}