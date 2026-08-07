import {

useProfitAndLossTotals

}

from "./useProfitAndLossTotals";

export function useRetainedEarnings(){

const{

netProfit,

}=

useProfitAndLossTotals();

return{

retainedEarnings:

netProfit,

};

}