import type {

Attendance

}

from "../types/Attendance";

let attendances:Attendance[]=[];

export const attendanceService={

async getAll(){

return attendances;

},

async create(

attendance:Attendance,

){

attendances=[

...attendances,

attendance,

];

return attendances;

},

async delete(

id:string,

){

attendances=

attendances.filter(

attendance=>

attendance.id!==id,

);

return attendances;

},

};