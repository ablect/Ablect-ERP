import {

useDepartments

}

from "../hooks/useDepartments";

import {

useDeleteDepartment

}

from "../hooks/useDeleteDepartment";

import DepartmentActions

from "./DepartmentActions";

import DepartmentEmptyState

from "./DepartmentEmptyState";

export default function DepartmentTable(){

const{

departments,

}=

useDepartments();

const{

remove,

}=

useDeleteDepartment();

if(

departments.length===0

){

return(

<DepartmentEmptyState/>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Department

</th>

<th className="p-3">

Code

</th>

<th className="p-3">

Manager

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

{departments.map(department=>(

<tr

key={department.id}

className="border-t"

>

<td className="p-3">

{department.name}

</td>

<td className="p-3">

{department.code}

</td>

<td className="p-3">

{department.manager}

</td>

<td className="p-3">

{department.active?

"Active"

:

"Inactive"}

</td>

<td className="p-3">

<DepartmentActions

onEdit={()=>{}}

onDelete={()=>

remove(

department.id,

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