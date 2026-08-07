import {

cashFlowService

}

from "../services/CashFlowService";

import {

useCashFlowStore

}

from "../store/CashFlowStore";

import {

useAccountingLedger

}

from "./useAccountingLedger";

export function useGenerateCashFlow(){

const{

entries,

}=

useAccountingLedger();

async function generate(){

const report=

entries.map(entry=>({

id:entry.id,

accountId:entry.account,

accountCode:entry.account,

accountName:entry.account,

category:"Operating" as const,

cashIn:entry.debit,

cashOut:entry.credit,

netCash:

entry.debit-entry.credit,

}));

const result=

await cashFlowService.generate(

report,

);

useCashFlowStore

.getState()

.setRows(

result,

);

}

return{

generate,

};

}