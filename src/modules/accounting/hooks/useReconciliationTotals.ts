import {

useBankTransactions

}

from "./useBankTransactions";

export function useReconciliationTotals(){

const{

transactions,

}=

useBankTransactions();

const debit=

transactions.reduce(

(sum,item)=>

sum+item.debit,

0,

);

const credit=

transactions.reduce(

(sum,item)=>

sum+item.credit,

0,

);

return{

debit,

credit,

difference:

debit-credit,

};

}