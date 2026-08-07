import {

usePayrolls

}

from "./usePayrolls";

export function usePayrollStatistics(){

const{

payrolls,

}=

usePayrolls();

const totalPayroll=

payrolls.reduce(

(sum,payroll)=>

sum+

payroll.netSalary,

0,

);

return{

employees:

payrolls.length,

totalPayroll,

};

}