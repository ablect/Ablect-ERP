import {

useProfitAndLoss

}

from "./useProfitAndLoss";

export function useProfitAndLossTotals(){

const{

rows,

}=

useProfitAndLoss();

const revenue=

rows

.filter(

row=>row.type==="Revenue"

)

.reduce(

(sum,row)=>sum+row.amount,

0,

);

const expenses=

rows

.filter(

row=>row.type==="Expense"

)

.reduce(

(sum,row)=>sum+row.amount,

0,

);

return{

revenue,

expenses,

netProfit:

revenue-expenses,

};

}