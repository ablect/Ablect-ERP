import {

useEffect

}

from "react";

import {

payrollService

}

from "../services/PayrollService";

import {

usePayrollStore

}

from "../store/PayrollStore";

export function useLoadPayrolls(){

const{

setPayrolls,

}=

usePayrollStore();

useEffect(()=>{

async function load(){

const payrolls=

await payrollService.getAll();

setPayrolls(

payrolls,

);

}

load();

},[

setPayrolls,

]);

}