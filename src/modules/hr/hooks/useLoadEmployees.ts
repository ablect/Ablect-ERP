import {

useEffect

}

from "react";

import {

employeeService

}

from "../services/EmployeeService";

import {

useEmployeeStore

}

from "../store/EmployeeStore";

export function useLoadEmployees(){

const{

setEmployees,

}=

useEmployeeStore();

useEffect(()=>{

async function load(){

const employees=

await employeeService.getAll();

setEmployees(

employees,

);

}

load();

},[

setEmployees,

]);

}