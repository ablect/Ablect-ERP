import {

useGroupedLedger

}

from "./useGroupedLedger";

import {

useTrialBalanceAccounts

}

from "./useTrialBalanceAccounts";

export function useTrialBalanceRows(){

const ledger=

useGroupedLedger();

const accounts=

useTrialBalanceAccounts();

return accounts.map(

account=>{

const row=

ledger.find(

item=>

item.account===account.name,

);

return{

account,

debit:

row?.debit??0,

credit:

row?.credit??0,

};

},

);

}