export interface InventoryItem{

  id:string;

  sku:string;

  itemName:string;

  category:string;

  warehouse:string;

  unit:string;

  quantity:number;

  reorderLevel:number;

  unitCost:number;

  sellingPrice:number;

  status:
    |"In Stock"
    |"Low Stock"
    |"Out of Stock";

}