import {

useEmployees

}

from "../hooks/useEmployees";

import {

useDeleteEmployee

}

from "../hooks/useDeleteEmployee";

import EmployeeAvatar

from "./EmployeeAvatar";

import EmployeeStatusBadge

from "./EmployeeStatusBadge";

import EmployeeActions

from "./EmployeeActions";

import EmployeeEmptyState

from "./EmployeeEmptyState";

export default function EmployeeTable(){

const{

employees,

}=

useEmployees();

const{

remove,

}=

useDeleteEmployee();

if(

employees.length===0

){

return(

<EmployeeEmptyState/>

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

Department

</th>

<th className="p-3">

Position

</th>

<th className="p-3">

Salary

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

{employees.map(employee=>(

<tr

key={employee.id}

className="border-t"

>

<td className="p-3">

<div className="flex items-center gap-3">

<EmployeeAvatar

name={employee.firstName}

/>

<div>

<p>

{employee.firstName}

{" "}

{employee.lastName}

</p>

<p className="text-xs text-slate-500">

{employee.email}

</p>

</div>

</div>

</td>

<td className="p-3">

{employee.department}

</td>

<td className="p-3">

{employee.position}

</td>

<td className="p-3">

₦

{employee.salary.toLocaleString()}

</td>

<td className="p-3">

<EmployeeStatusBadge

status={employee.status}

/>

</td>

<td className="p-3">

<EmployeeActions

onEdit={()=>{}}

onDelete={()=>

remove(

employee.id,

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