import {

useOpenAccountingPeriod

}

from "./useOpenAccountingPeriod";

export function useReopenAccountingPeriod(){

const{

open,

}=

useOpenAccountingPeriod();

return{

reopen:open,

};

}