import {

useEffect

}

from "react";

import {

departmentService

}

from "../services/DepartmentService";

import {

useDepartmentStore

}

from "../store/DepartmentStore";

export function useLoadDepartments(){

const{

setDepartments,

}=

useDepartmentStore();

useEffect(()=>{

async function load(){

const departments=

await departmentService.getAll();

setDepartments(

departments,

);

}

load();

},[

setDepartments,

]);

}