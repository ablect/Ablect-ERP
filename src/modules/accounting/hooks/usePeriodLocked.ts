import {

useAccountingPeriods

}

from "./useAccountingPeriods";

export function usePeriodLocked(

periodId:string,

){

const{

periods,

}=

useAccountingPeriods();

const period=

periods.find(

item=>

item.id===periodId,

);

return period?.status==="Closed";

}