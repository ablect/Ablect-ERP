import {

createEmployee

}

from "../utils/createEmployee";

import {

employeeService

}

from "../services/EmployeeService";

import {

useEmployeeStore

}

from "../store/EmployeeStore";

export function useCreateEmployee(){

async function create(

firstName:string,

lastName:string,

email:string,

phone:string,

department:string,

position:string,

salary:number,

){

const employee=

createEmployee(

firstName,

lastName,

email,

phone,

department,

position,

salary,

);

const employees=

await employeeService.create(

employee,

);

useEmployeeStore

.getState()

.setEmployees(

employees,

);

}

return{

create,

};

}