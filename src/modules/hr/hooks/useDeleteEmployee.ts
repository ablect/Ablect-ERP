import {

employeeService

}

from "../services/EmployeeService";

import {

useEmployeeStore

}

from "../store/EmployeeStore";

export function useDeleteEmployee(){

async function remove(

id:string,

){

const employees=

await employeeService.delete(

id,

);

useEmployeeStore

.getState()

.setEmployees(

employees,

);

}

return{

remove,

};

}