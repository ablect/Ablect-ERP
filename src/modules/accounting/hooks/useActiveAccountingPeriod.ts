import {

useAccountingPeriods

}

from "./useAccountingPeriods";

export function useActiveAccountingPeriod(){

const{

periods,

}=

useAccountingPeriods();

return periods.find(

period=>

period.status==="Open",

);

}