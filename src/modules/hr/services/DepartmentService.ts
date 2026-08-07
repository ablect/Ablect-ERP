import type {

Department

}

from "../types/Department";

let departments:Department[]=[];

export const departmentService={

async getAll(){

return departments;

},

async create(

department:Department,

){

departments=[

...departments,

department,

];

return departments;

},

async delete(

id:string,

){

departments=

departments.filter(

department=>

department.id!==id,

);

return departments;

},

};