import {

useApplicants

}

from "../hooks/useApplicants";

import {

useDeleteApplicant

}

from "../hooks/useDeleteApplicant";

import ApplicantActions

from "./ApplicantActions";

import ApplicantEmptyState

from "./ApplicantEmptyState";

export default function ApplicantTable(){

const{

applicants,

}=

useApplicants();

const{

remove,

}=

useDeleteApplicant();

if(

applicants.length===0

){

return(

<ApplicantEmptyState/>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Name

</th>

<th className="p-3">

Email

</th>

<th className="p-3">

Phone

</th>

<th className="p-3">

Position

</th>

<th className="p-3">

Stage

</th>

<th className="p-3">

Actions

</th>

</tr>

</thead>

<tbody>

{applicants.map(applicant=>(

<tr

key={applicant.id}

className="border-t"

>

<td className="p-3">

{applicant.fullName}

</td>

<td className="p-3">

{applicant.email}

</td>

<td className="p-3">

{applicant.phone}

</td>

<td className="p-3">

{applicant.position}

</td>

<td className="p-3">

{applicant.stage}

</td>

<td className="p-3">

<ApplicantActions

onEdit={()=>{}}

onDelete={()=>

remove(

applicant.id,

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