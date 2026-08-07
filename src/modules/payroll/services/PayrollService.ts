import type {

Payroll

}

from "../types/Payroll";

let payrolls:Payroll[]=[];

export const payrollService={

async getAll(){

return payrolls;

},

async create(

payroll:Payroll,

){

payrolls=[

...payrolls,

payroll,

];

return payrolls;

},

async delete(

id:string,

){

payrolls=

payrolls.filter(

payroll=>

payroll.id!==id,

);

return payrolls;

},

};