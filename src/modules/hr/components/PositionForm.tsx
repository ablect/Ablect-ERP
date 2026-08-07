import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreatePosition

}

from "../hooks/useCreatePosition";

export default function PositionForm(){

const{

create,

}=

useCreatePosition();

const[

title,

setTitle,

]=

useState("");

const[

departmentId,

setDepartmentId,

]=

useState("");

const[

level,

setLevel,

]=

useState("");

const[

salaryGrade,

setSalaryGrade,

]=

useState("");

async function save(){

await create(

title,

departmentId,

level,

salaryGrade,

);

setTitle("");

setDepartmentId("");

setLevel("");

setSalaryGrade("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Position"

value={title}

onChange={(e)=>

setTitle(

e.target.value,

)

}

/>

<Input

label="Department ID"

value={departmentId}

onChange={(e)=>

setDepartmentId(

e.target.value,

)

}

/>

<Input

label="Level"

value={level}

onChange={(e)=>

setLevel(

e.target.value,

)

}

/>

<Input

label="Salary Grade"

value={salaryGrade}

onChange={(e)=>

setSalaryGrade(

e.target.value,

)

}

/>

<Button

onClick={save}

>

Save Position

</Button>

</div>

</Card>

);

}