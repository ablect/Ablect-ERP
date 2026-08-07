import {

useCashFlow

}

from "./useCashFlow";

export function useCashFlowStatistics(){

const{

rows,

}=

useCashFlow();

return{

transactions:

rows.length,

};

}