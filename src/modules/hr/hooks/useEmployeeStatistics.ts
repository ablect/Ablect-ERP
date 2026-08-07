import {

useEmployees

}

from "./useEmployees";

export function useEmployeeStatistics(){

const{

employees,

}=

useEmployees();

const active=

employees.filter(

employee=>

employee.status===

"Active",

).length;

const inactive=

employees.length-

active;

return{

total:

employees.length,

active,

inactive,

};

}