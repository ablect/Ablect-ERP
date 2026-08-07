import {

usePerformanceReviews

}

from "../hooks/usePerformanceReviews";

import {

useDeletePerformanceReview

}

from "../hooks/useDeletePerformanceReview";

import PerformanceActions

from "./PerformanceActions";

import PerformanceEmptyState

from "./PerformanceEmptyState";

export default function PerformanceReviewTable(){

const{

reviews,

}=

usePerformanceReviews();

const{

remove,

}=

useDeletePerformanceReview();

if(

reviews.length===0

){

return(

<PerformanceEmptyState/>

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

Period

</th>

<th className="p-3">

Reviewer

</th>

<th className="p-3">

Score

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

{reviews.map(review=>(

<tr

key={review.id}

className="border-t"

>

<td className="p-3">

{review.employeeId}

</td>

<td className="p-3">

{review.reviewPeriod}

</td>

<td className="p-3">

{review.reviewer}

</td>

<td className="p-3">

{review.score}

</td>

<td className="p-3">

{review.status}

</td>

<td className="p-3">

<PerformanceActions

onEdit={()=>{}}

onDelete={()=>

remove(

review.id,

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