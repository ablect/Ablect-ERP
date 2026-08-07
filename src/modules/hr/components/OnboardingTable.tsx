import {

useOnboarding

}

from "../hooks/useOnboarding";

import {

useDeleteOnboarding

}

from "../hooks/useDeleteOnboarding";

import OnboardingActions

from "./OnboardingActions";

import OnboardingEmptyState

from "./OnboardingEmptyState";

export default function OnboardingTable(){

const{

records,

}=

useOnboarding();

const{

remove,

}=

useDeleteOnboarding();

if(

records.length===0

){

return(

<OnboardingEmptyState/>

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

Supervisor

</th>

<th className="p-3">

Progress

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

{records.map(record=>(

<tr

key={record.id}

className="border-t"

>

<td className="p-3">

{record.employeeId}

</td>

<td className="p-3">

{record.department}

</td>

<td className="p-3">

{record.supervisor}

</td>

<td className="p-3">

{record.progress}%

</td>

<td className="p-3">

{record.status}

</td>

<td className="p-3">

<OnboardingActions

onEdit={()=>{}}

onDelete={()=>

remove(

record.id,

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