import {

usePayrollStore

}

from "../store/PayrollStore";

export function useApprovePayroll(){

function approve(

id:string,

){

const{

payrolls,

setPayrolls,

}=

usePayrollStore.getState();

const updated=

payrolls.map(payroll=>

payroll.id===id

?{

...payroll,

status:"Processed",

}

:payroll,

);

setPayrolls(

updated,

);

}

return{

approve,

};

}