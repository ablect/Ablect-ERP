import {

trialBalanceService

}

from "../services/TrialBalanceService";

import {

useTrialBalanceStore

}

from "../store/TrialBalanceStore";

import {

useAccountingLedger

}

from "./useAccountingLedger";

export function useGenerateTrialBalance(){

const{

entries,

}=

useAccountingLedger();

async function generate(){

const rows=

entries.map(entry=>({

accountId:entry.account,

accountCode:entry.account,

accountName:entry.account,

accountType:"Asset" as const,

debit:entry.debit,

credit:entry.credit,

}));

const result=

await trialBalanceService.generate(

rows,

);

useTrialBalanceStore

.getState()

.setRows(

result,

);

}

return{

generate,

};

}