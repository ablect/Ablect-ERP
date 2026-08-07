import {

createDepartment

}

from "../utils/createDepartment";

import {

departmentService

}

from "../services/DepartmentService";

import {

useDepartmentStore

}

from "../store/DepartmentStore";

export function useCreateDepartment(){

async function create(

name:string,

code:string,

manager:string,

){

const department=

createDepartment(

name,

code,

manager,

);

const departments=

await departmentService.create(

department,

);

useDepartmentStore

.getState()

.setDepartments(

departments,

);

}

return{

create,

};

}