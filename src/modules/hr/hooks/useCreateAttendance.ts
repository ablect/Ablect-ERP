import {

createAttendance

}

from "../utils/createAttendance";

import {

attendanceService

}

from "../services/AttendanceService";

import {

useAttendanceStore

}

from "../store/AttendanceStore";

import type {

Attendance

}

from "../types/Attendance";

export function useCreateAttendance(){

async function create(

employeeId:string,

date:string,

clockIn:string,

clockOut:string,

status:Attendance["status"],

){

const attendance=

createAttendance(

employeeId,

date,

clockIn,

clockOut,

status,

);

const attendances=

await attendanceService.create(

attendance,

);

useAttendanceStore

.getState()

.setAttendances(

attendances,

);

}

return{

create,

};

}