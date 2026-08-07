import type {

StockLedgerEntry

}

from "../types/StockLedgerEntry";

export function createStockLedgerEntry(

productId:string,

warehouseId:string,

quantity:number,

movement:

|"IN"

|"OUT",

reference:string,

referenceId:string,

):StockLedgerEntry{

return{

id:crypto.randomUUID(),

productId,

warehouseId,

quantity,

movement,

reference,

referenceId,

date:new Date().toISOString(),

};

}