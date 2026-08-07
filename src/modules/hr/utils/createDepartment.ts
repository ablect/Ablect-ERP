import type {

Department

}

from "../types/Department";

export function createDepartment(

name:string,

code:string,

manager:string,

):Department{

return{

id:crypto.randomUUID(),

name,

code,

manager,

active:true,

};

}