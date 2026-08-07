import type {

Payroll

}

from "../types/Payroll";

export function generatePayslip(

payroll:Payroll,

){

return{

employeeId:

payroll.employeeId,

month:

payroll.month,

basicSalary:

payroll.basicSalary,

allowance:

payroll.allowance,

deduction:

payroll.deduction,

tax:

payroll.tax,

netSalary:

payroll.netSalary,

status:

payroll.status,

};

}