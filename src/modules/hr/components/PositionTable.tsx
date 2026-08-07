import {

usePositions

}

from "../hooks/usePositions";

import {

useDeletePosition

}

from "../hooks/useDeletePosition";

import PositionActions

from "./PositionActions";

import PositionEmptyState

from "./PositionEmptyState";

export default function PositionTable(){

const{

positions,

}=

usePositions();

const{

remove,

}=

useDeletePosition();

if(

positions.length===0

){

return(

<PositionEmptyState/>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Position</th>

<th className="p-3">Department</th>

<th className="p-3">Level</th>

<th className="p-3">Salary Grade</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{positions.map(position=>(

<tr

key={position.id}

className="border-t"

>

<td className="p-3">

{position.title}

</td>

<td className="p-3">

{position.departmentId}

</td>

<td className="p-3">

{position.level}

</td>

<td className="p-3">

{position.salaryGrade}

</td>

<td className="p-3">

{position.active?

"Active"

:

"Inactive"}

</td>

<td className="p-3">

<PositionActions

onEdit={()=>{}}

onDelete={()=>

remove(

position.id,

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