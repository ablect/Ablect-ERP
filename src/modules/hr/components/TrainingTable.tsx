import {

useTrainingCourses

}

from "../hooks/useTrainingCourses";

import {

useDeleteTrainingCourse

}

from "../hooks/useDeleteTrainingCourse";

import TrainingActions

from "./TrainingActions";

import TrainingEmptyState

from "./TrainingEmptyState";

export default function TrainingTable(){

const{

courses,

}=

useTrainingCourses();

const{

remove,

}=

useDeleteTrainingCourse();

if(

courses.length===0

){

return(

<TrainingEmptyState/>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Title

</th>

<th className="p-3">

Trainer

</th>

<th className="p-3">

Category

</th>

<th className="p-3">

Duration

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

{courses.map(course=>(

<tr

key={course.id}

className="border-t"

>

<td className="p-3">

{course.title}

</td>

<td className="p-3">

{course.trainer}

</td>

<td className="p-3">

{course.category}

</td>

<td className="p-3">

{course.duration} hrs

</td>

<td className="p-3">

{course.status}

</td>

<td className="p-3">

<TrainingActions

onEdit={()=>{}}

onDelete={()=>

remove(

course.id,

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