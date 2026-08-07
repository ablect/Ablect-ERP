import type {

Position

}

from "../types/Position";

export function createPosition(

title:string,

departmentId:string,

level:string,

salaryGrade:string,

):Position{

return{

id:crypto.randomUUID(),

title,

departmentId,

level,

salaryGrade,

active:true,

};

}