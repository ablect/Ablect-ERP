import {

useBalanceSheet

}

from "./useBalanceSheet";

export function useBalanceSheetTotals(){

const{

rows,

}=

useBalanceSheet();

const assets=

rows

.filter(

row=>

row.accountType==="Asset"

)

.reduce(

(sum,row)=>

sum+row.amount,

0,

);

const liabilities=

rows

.filter(

row=>

row.accountType==="Liability"

)

.reduce(

(sum,row)=>

sum+row.amount,

0,

);

const equity=

rows

.filter(

row=>

row.accountType==="Equity"

)

.reduce(

(sum,row)=>

sum+row.amount,

0,

);

return{

assets,

liabilities,

equity,

};

}