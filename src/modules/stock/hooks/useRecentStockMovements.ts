import {

useStockMovements

}

from "./useStockMovements";

export function useRecentStockMovements(){

const{

movements,

}=

useStockMovements();

return{

movements:

movements.slice(-5).reverse(),

};

}