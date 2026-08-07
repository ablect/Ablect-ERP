export interface StockMovement{

  id:string;

  itemId:string;

  warehouseId:string;

  movementType:
    |"Stock In"
    |"Stock Out"
    |"Transfer"
    |"Adjustment";

  quantity:number;

  unitCost:number;

  reference:string;

  movementDate:string;

  remarks:string;

}