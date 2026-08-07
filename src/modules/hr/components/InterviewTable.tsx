import {

useInterviews

}

from "../hooks/useInterviews";

import {

useDeleteInterview

}

from "../hooks/useDeleteInterview";

import InterviewActions

from "./InterviewActions";

import InterviewEmptyState

from "./InterviewEmptyState";

export default function InterviewTable(){

const{

interviews,

}=

useInterviews();

const{

remove,

}=

useDeleteInterview();

if(

interviews.length===0

){

return(

<InterviewEmptyState/>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Applicant

</th>

<th className="p-3">

Interviewer

</th>

<th className="p-3">

Date

</th>

<th className="p-3">

Time

</th>

<th className="p-3">

Result

</th>

<th className="p-3">

Actions

</th>

</tr>

</thead>

<tbody>

{interviews.map(interview=>(

<tr

key={interview.id}

className="border-t"

>

<td className="p-3">

{interview.applicantId}

</td>

<td className="p-3">

{interview.interviewer}

</td>

<td className="p-3">

{interview.interviewDate}

</td>

<td className="p-3">

{interview.interviewTime}

</td>

<td className="p-3">

{interview.result}

</td>

<td className="p-3">

<InterviewActions

onEdit={()=>{}}

onDelete={()=>

remove(

interview.id,

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