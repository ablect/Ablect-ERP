import {

useProfitAndLoss

}

from "./useProfitAndLoss";

export function useProfitAndLossStatistics(){

const{

rows,

}=

useProfitAndLoss();

return{

accounts:

rows.length,

};

}