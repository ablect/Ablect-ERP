import type {

Employee

}

from "../types/Employee";

export function createEmployee(

firstName:string,

lastName:string,

email:string,

phone:string,

department:string,

position:string,

salary:number,

):Employee{

return{

id:crypto.randomUUID(),

employeeNumber:

`EMP-${Date.now()}`,

firstName,

lastName,

email,

phone,

department,

position,

salary,

status:"Active",

hiredDate:

new Date()

.toISOString()

.slice(0,10),

};

}