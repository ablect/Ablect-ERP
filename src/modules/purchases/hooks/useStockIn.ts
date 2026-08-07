import {

stockLedgerService

}

from "../services/StockLedgerService";

import {

createStockLedgerEntry

}

from "../utils/createStockLedgerEntry";

import {

useStockLedgerStore

}

from "../store/StockLedgerStore";

export function useStockIn(){

async function stockIn(

productId:string,

warehouseId:string,

quantity:number,

referenceId:string,

){

const entry=

createStockLedgerEntry(

productId,

warehouseId,

quantity,

"IN",

"GRN",

referenceId,

);

const entries=

await stockLedgerService.create(

entry,

);

useStockLedgerStore

.getState()

.setEntries(

entries,

);

}

return{

stockIn,

};

}