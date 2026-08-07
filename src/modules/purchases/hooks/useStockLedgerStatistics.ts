import {

useStockLedger

}

from "./useStockLedger";

export function useStockLedgerStatistics(){

const{

entries,

}=

useStockLedger();

const stockIn=

entries.filter(

e=>e.movement==="IN",

).length;

const stockOut=

entries.filter(

e=>e.movement==="OUT",

).length;

return{

total:

entries.length,

stockIn,

stockOut,

};

}