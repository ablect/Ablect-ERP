import {

useActiveAccountingPeriod

}

from "./useActiveAccountingPeriod";

export function useClosingValidation(){

const active=

useActiveAccountingPeriod();

return{

canPost:

active?.status==="Open",

};

}