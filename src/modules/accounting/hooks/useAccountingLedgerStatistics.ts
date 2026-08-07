import {

useAccountingLedger

}

from "./useAccountingLedger";

export function useAccountingLedgerStatistics(){

const{

entries,

}=

useAccountingLedger();

const debit=

entries.reduce(

(sum,item)=>

sum+item.debit,

0,

);

const credit=

entries.reduce(

(sum,item)=>

sum+item.credit,

0,

);

return{

entries:

entries.length,

debit,

credit,

};

}