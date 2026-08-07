import {

useTrialBalance

}

from "./useTrialBalance";

export function useTrialBalanceTotals(){

const{

rows,

}=

useTrialBalance();

const debit=

rows.reduce(

(sum,row)=>

sum+row.debit,

0,

);

const credit=

rows.reduce(

(sum,row)=>

sum+row.credit,

0,

);

return{

debit,

credit,

balanced:

debit===credit,

};

}