import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateTrainingCourse

}

from "../hooks/useCreateTrainingCourse";

export default function TrainingForm(){

const{

create,

}=

useCreateTrainingCourse();

const[

title,

setTitle,

]=

useState("");

const[

trainer,

setTrainer,

]=

useState("");

const[

category,

setCategory,

]=

useState("");

const[

duration,

setDuration,

]=

useState(0);

const[

startDate,

setStartDate,

]=

useState("");

const[

endDate,

setEndDate,

]=

useState("");

async function save(){

await create(

title,

trainer,

category,

duration,

startDate,

endDate,

);

setTitle("");

setTrainer("");

setCategory("");

setDuration(0);

setStartDate("");

setEndDate("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Course Title"

value={title}

onChange={(e)=>

setTitle(

e.target.value,

)

}

/>

<Input

label="Trainer"

value={trainer}

onChange={(e)=>

setTrainer(

e.target.value,

)

}

/>

<Input

label="Category"

value={category}

onChange={(e)=>

setCategory(

e.target.value,

)

}

/>

<Input

label="Duration (Hours)"

type="number"

value={duration}

onChange={(e)=>

setDuration(

Number(

e.target.value,

)

)

}

/>

<Input

label="Start Date"

type="date"

value={startDate}

onChange={(e)=>

setStartDate(

e.target.value,

)

}

/>

<Input

label="End Date"

type="date"

value={endDate}

onChange={(e)=>

setEndDate(

e.target.value,

)

}

/>

<Button

onClick={save}

>

Create Course

</Button>

</div>

</Card>

);

}