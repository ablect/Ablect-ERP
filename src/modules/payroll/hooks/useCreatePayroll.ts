import {

createPayroll

}

from "../utils/createPayroll";

import {

payrollService

}

from "../services/PayrollService";

import {

usePayrollStore

}

from "../store/PayrollStore";

export function useCreatePayroll(){

async function create(

employeeId:string,

month:string,

basicSalary:number,

allowance:number,

deduction:number,

tax:number,

){

const payroll=

createPayroll(

employeeId,

month,

basicSalary,

allowance,

deduction,

tax,

);

const payrolls=

await payrollService.create(

payroll,

);

usePayrollStore

.getState()

.setPayrolls(

payrolls,

);

}

return{

create,

};

}