import {

attendanceService

}

from "../services/AttendanceService";

import {

useAttendanceStore

}

from "../store/AttendanceStore";

export function useDeleteAttendance(){

async function remove(

id:string,

){

const attendances=

await attendanceService.delete(

id,

);

useAttendanceStore

.getState()

.setAttendances(

attendances,

);

}

return{

remove,

};

}