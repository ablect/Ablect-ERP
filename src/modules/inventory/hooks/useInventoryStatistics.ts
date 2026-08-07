import {

useInventory

}

from "./useInventory";

export function useInventoryStatistics(){

const{

items,

}=

useInventory();

const inStock=

items.filter(

i=>i.status==="In Stock",

).length;

const lowStock=

items.filter(

i=>i.status==="Low Stock",

).length;

const outOfStock=

items.filter(

i=>i.status==="Out of Stock",

).length;

const inventoryValue=

items.reduce(

(sum,item)=>

sum+

(item.quantity*item.unitCost),

0,

);

return{

total:

items.length,

inStock,

lowStock,

outOfStock,

inventoryValue,

};

}