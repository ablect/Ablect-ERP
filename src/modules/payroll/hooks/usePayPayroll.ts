import {

usePayrollStore

}

from "../store/PayrollStore";

export function usePayPayroll(){

function pay(

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

status:"Paid",

paymentDate:

new Date()

.toISOString()

.slice(0,10),

}

:payroll,

);

setPayrolls(

updated,

);

}

return{

pay,

};

}