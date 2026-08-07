import {

stockMovementService

}

from "../services/StockMovementService";

import {

useStockMovementStore

}

from "../store/StockMovementStore";

export function useDeleteStockMovement(){

async function remove(

id:string,

){

const movements=

await stockMovementService.delete(

id,

);

useStockMovementStore

.getState()

.setMovements(

movements,

);

}

return{

remove,

};

}