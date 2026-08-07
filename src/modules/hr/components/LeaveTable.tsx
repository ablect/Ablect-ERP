import {

useLeaves

}

from "../hooks/useLeaves";

import {

useDeleteLeave

}

from "../hooks/useDeleteLeave";

import LeaveActions

from "./LeaveActions";

import LeaveEmptyState

from "./LeaveEmptyState";

export default function LeaveTable(){

const{

leaves,

}=

useLeaves();

const{

remove,

}=

useDeleteLeave();

if(

leaves.length===0

){

return(

<LeaveEmptyState/>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Employee

</th>

<th className="p-3">

Leave Type

</th>

<th className="p-3">

Start

</th>

<th className="p-3">

End

</th>

<th className="p-3">

Status

</th>

<th className="p-3">

Actions

</th>

</tr>

</thead>

<tbody>

{leaves.map(leave=>(

<tr

key={leave.id}

className="border-t"

>

<td className="p-3">

{leave.employeeId}

</td>

<td className="p-3">

{leave.leaveType}

</td>

<td className="p-3">

{leave.startDate}

</td>

<td className="p-3">

{leave.endDate}

</td>

<td className="p-3">

{leave.status}

</td>

<td className="p-3">

<LeaveActions

onEdit={()=>{}}

onDelete={()=>

remove(

leave.id,

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