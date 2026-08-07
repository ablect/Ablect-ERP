import type {

Attendance

}

from "../types/Attendance";

export function createAttendance(

employeeId:string,

date:string,

clockIn:string,

clockOut:string,

status:Attendance["status"],

):Attendance{

return{

id:crypto.randomUUID(),

employeeId,

date,

clockIn,

clockOut,

status,

};

}