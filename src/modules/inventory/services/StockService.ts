import type { InventoryProduct } from "../types/InventoryProduct";

export class StockService{

calculateValue(products:InventoryProduct[]){

return products.reduce(

(total,p)=>total+p.price*p.quantity,

0

);

}

lowStock(products:InventoryProduct[]){

return products.filter(

p=>p.quantity<=p.minimumStock

);

}

outOfStock(products:InventoryProduct[]){

return products.filter(

p=>p.quantity===0

);

}

}

export const stockService=new StockService();