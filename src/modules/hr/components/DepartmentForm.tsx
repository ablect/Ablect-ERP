import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateDepartment

}

from "../hooks/useCreateDepartment";

export default function DepartmentForm(){

const{

create,

}=

useCreateDepartment();

const[

name,

setName,

]=

useState("");

const[

code,

setCode,

]=

useState("");

const[

manager,

setManager,

]=

useState("");

async function save(){

await create(

name,

code,

manager,

);

setName("");

setCode("");

setManager("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Department"

value={name}

onChange={(e)=>

setName(

e.target.value,

)

}

/>

<Input

label="Code"

value={code}

onChange={(e)=>

setCode(

e.target.value,

)

}

/>

<Input

label="Manager"

value={manager}

onChange={(e)=>

setManager(

e.target.value,

)

}

/>

<Button

onClick={save}

>

Save Department

</Button>

</div>

</Card>

);

}