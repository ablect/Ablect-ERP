import {

useCashFlow

}

from "./useCashFlow";

export function useCashFlowTotals(){

const{

rows,

}=

useCashFlow();

const cashIn=

rows.reduce(

(sum,row)=>

sum+row.cashIn,

0,

);

const cashOut=

rows.reduce(

(sum,row)=>

sum+row.cashOut,

0,

);

return{

cashIn,

cashOut,

netCash:

cashIn-cashOut,

};

}