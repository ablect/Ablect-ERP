import {

useCloseAccountingPeriod

}

from "./useCloseAccountingPeriod";

export function useMonthEndClosing(){

const{

close,

}=

useCloseAccountingPeriod();

return{

closeMonth:close,

};

}