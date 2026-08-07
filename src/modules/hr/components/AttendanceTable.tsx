import {

useAttendances

}

from "../hooks/useAttendances";

import {

useDeleteAttendance

}

from "../hooks/useDeleteAttendance";

import AttendanceActions

from "./AttendanceActions";

import AttendanceEmptyState

from "./AttendanceEmptyState";

export default function AttendanceTable(){

const{

attendances,

}=

useAttendances();

const{

remove,

}=

useDeleteAttendance();

if(

attendances.length===0

){

return(

<AttendanceEmptyState/>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Employee</th>

<th className="p-3">Date</th>

<th className="p-3">Clock In</th>

<th className="p-3">Clock Out</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{attendances.map(attendance=>(

<tr

key={attendance.id}

className="border-t"

>

<td className="p-3">

{attendance.employeeId}

</td>

<td className="p-3">

{attendance.date}

</td>

<td className="p-3">

{attendance.clockIn}

</td>

<td className="p-3">

{attendance.clockOut}

</td>

<td className="p-3">

{attendance.status}

</td>

<td className="p-3">

<AttendanceActions

onEdit={()=>{}}

onDelete={()=>

remove(

attendance.id,

)

}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}