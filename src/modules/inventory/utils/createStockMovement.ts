import type {

StockMovement

}

from "../types/StockMovement";

export function createStockMovement(

itemId:string,

warehouseId:string,

movementType:

"Stock In"

|

"Stock Out"

|

"Transfer"

|

"Adjustment",

quantity:number,

unitCost:number,

reference:string,

movementDate:string,

remarks:string,

):StockMovement{

return{

id:crypto.randomUUID(),

itemId,

warehouseId,

movementType,

quantity,

unitCost,

reference,

movementDate,

remarks,

};

}