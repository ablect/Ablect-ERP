import {

useTrialBalance

}

from "./useTrialBalance";

export function useTrialBalanceStatistics(){

const{

rows,

}=

useTrialBalance();

return{

accounts:

rows.length,

};

}