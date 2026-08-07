import {

inventoryStockService

}

from "./InventoryStockService";

import {

stockMovementService

}

from "./StockMovementService";

import {

createStockMovement

}

from "../utils/createStockMovement";

export const purchaseStockService={

receive(

productId:string,

reference:string,

quantity:number,

balance:number,

){

inventoryStockService.increase(

productId,

quantity,

);

stockMovementService.create(

createStockMovement(

productId,

reference,

"IN",

quantity,

balance,

)

);

},

};