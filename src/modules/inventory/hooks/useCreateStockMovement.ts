import {

createStockMovement

}

from "../utils/createStockMovement";

import {

stockMovementService

}

from "../services/StockMovementService";

import {

useStockMovementStore

}

from "../store/StockMovementStore";

export function useCreateStockMovement(){

async function create(

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

){

const movement=

createStockMovement(

itemId,

warehouseId,

movementType,

quantity,

unitCost,

reference,

movementDate,

remarks,

);

const movements=

await stockMovementService.create(

movement,

);

useStockMovementStore

.getState()

.setMovements(

movements,

);

}

return{

create,

};

}