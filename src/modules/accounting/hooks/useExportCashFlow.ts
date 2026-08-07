import {

useCashFlowStore

}

from "../store/CashFlowStore";

export function useExportCashFlow(){

const{

rows,

}=

useCashFlowStore();

function exportReport(){

console.log(rows);

}

return{

exportReport,

};

}