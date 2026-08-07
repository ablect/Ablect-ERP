import {

useAttendances

}

from "../hooks/useAttendances";

export default function AttendanceCount(){

const{

attendances,

}=

useAttendances();

return(

<p>

Total Attendance Records:

{" "}

{attendances.length}

</p>

);

}