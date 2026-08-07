import type {

Employee

}

from "../types/Employee";

let employees:Employee[]=[];

export const employeeService={

async getAll(){

return employees;

},

async create(

employee:Employee,

){

employees=[

...employees,

employee,

];

return employees;

},

async delete(

id:string,

){

employees=

employees.filter(

employee=>

employee.id!==id,

);

return employees;

},

};