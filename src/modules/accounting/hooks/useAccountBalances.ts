import {

useMemo

}

from "react";

import {

useLedger

}

from "./useLedger";

export function useAccountBalances(){

const{

entries,

}=

useLedger();

return useMemo(()=>{

const balances:

Record<string,number>={};

entries.forEach(entry=>{

balances[entry.account]=

(

balances[entry.account]??

0

)

+

entry.debit

-

entry.credit;

});

return balances;

},[entries]);

}