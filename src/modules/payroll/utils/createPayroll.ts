import type {

Payroll

}

from "../types/Payroll";

import {

calculateNetSalary

}

from "./calculateNetSalary";

export function createPayroll(

employeeId:string,

month:string,

basicSalary:number,

allowance:number,

deduction:number,

tax:number,

):Payroll{

return{

id:crypto.randomUUID(),

employeeId,

month,

basicSalary,

allowance,

deduction,

tax,

netSalary:

calculateNetSalary(

basicSalary,

allowance,

deduction,

tax,

),

status:"Draft",

paymentDate:"",

};

}