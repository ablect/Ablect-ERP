import {

useAttendances

}

from "./useAttendances";

export function useAttendanceStatistics(){

const{

attendances,

}=

useAttendances();

const present=

attendances.filter(

attendance=>

attendance.status==="Present",

).length;

const late=

attendances.filter(

attendance=>

attendance.status==="Late",

).length;

const absent=

attendances.filter(

attendance=>

attendance.status==="Absent",

).length;

return{

total:

attendances.length,

present,

late,

absent,

};

}