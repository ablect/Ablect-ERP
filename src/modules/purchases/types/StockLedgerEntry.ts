export interface StockLedgerEntry{

id:string;

productId:string;

warehouseId:string;

quantity:number;

movement:

|"IN"

|"OUT";

reference:string;

referenceId:string;

date:string;

}