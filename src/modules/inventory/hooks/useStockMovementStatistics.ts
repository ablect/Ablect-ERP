import {

useStockMovements

}

from "./useStockMovements";

export function useStockMovementStatistics(){

const{

movements,

}=

useStockMovements();

const stockIn=

movements.filter(

m=>m.movementType==="Stock In",

).length;

const stockOut=

movements.filter(

m=>m.movementType==="Stock Out",

).length;

const transfers=

movements.filter(

m=>m.movementType==="Transfer",

).length;

const adjustments=

movements.filter(

m=>m.movementType==="Adjustment",

).length;

return{

total:

movements.length,

stockIn,

stockOut,

transfers,

adjustments,

};

}