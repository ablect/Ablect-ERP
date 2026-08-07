import {

accountingPeriodService

}

from "../services/AccountingPeriodService";

import {

useAccountingPeriodStore

}

from "../store/AccountingPeriodStore";

export function useCloseAccountingPeriod(){

async function close(

periodId:string,

){

const periods=

await accountingPeriodService.getAll();

const updated=

periods.map(period=>(

period.id===periodId

?{

...period,

status:"Closed" as const,

}

:period

));

useAccountingPeriodStore

.getState()

.setPeriods(

updated,

);

}

return{

close,

};

}