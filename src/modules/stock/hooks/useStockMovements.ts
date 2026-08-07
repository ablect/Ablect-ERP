import {

useStockMovementStore

}

from "../store/StockMovementStore";

export function useStockMovements(){

const{

movements,

}=

useStockMovementStore();

return{

movements,

};

}