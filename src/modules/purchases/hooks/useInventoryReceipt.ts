import {

useInventoryStore

}

from "../../inventory/store/InventoryStore";

export function useInventoryReceipt(){

function receive(

productId:string,

quantity:number,

){

const{

products,

setProducts,

}=

useInventoryStore.getState();

const updated=

products.map(product=>

product.id===productId

?{

...product,

quantity:

product.quantity+

quantity,

}

:product

);

setProducts(

updated,

);

}

return{

receive,

};

}