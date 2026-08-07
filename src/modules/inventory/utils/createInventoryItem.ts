import type {

InventoryItem

}

from "../types/InventoryItem";

export function createInventoryItem(

sku:string,

itemName:string,

category:string,

warehouse:string,

unit:string,

quantity:number,

reorderLevel:number,

unitCost:number,

sellingPrice:number,

):InventoryItem{

let status:

"In Stock"

|

"Low Stock"

|

"Out of Stock";

if(quantity<=0){

status="Out of Stock";

}

else if(

quantity<=

reorderLevel

){

status="Low Stock";

}

else{

status="In Stock";

}

return{

id:crypto.randomUUID(),

sku,

itemName,

category,

warehouse,

unit,

quantity,

reorderLevel,

unitCost,

sellingPrice,

status,

};

}