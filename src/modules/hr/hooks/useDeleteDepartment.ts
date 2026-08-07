import {

departmentService

}

from "../services/DepartmentService";

import {

useDepartmentStore

}

from "../store/DepartmentStore";

export function useDeleteDepartment(){

async function remove(

id:string,

){

const departments=

await departmentService.delete(

id,

);

useDepartmentStore

.getState()

.setDepartments(

departments,

);

}

return{

remove,

};

}