import {

useTrialBalanceTotals

}

from "./useTrialBalanceTotals";

export function useTrialBalanceValidation(){

const{

debit,

credit,

}=

useTrialBalanceTotals();

return{

balanced:

debit===credit,

difference:

Math.abs(

debit-credit,

),

};

}