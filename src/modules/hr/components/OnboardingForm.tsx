import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateOnboarding

}

from "../hooks/useCreateOnboarding";

export default function OnboardingForm(){

const{

create,

}=

useCreateOnboarding();

const[

employeeId,

setEmployeeId,

]=

useState("");

const[

department,

setDepartment,

]=

useState("");

const[

supervisor,

setSupervisor,

]=

useState("");

async function save(){

await create(

employeeId,

department,

supervisor,

);

setEmployeeId("");

setDepartment("");

setSupervisor("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Employee ID"

value={employeeId}

onChange={(e)=>

setEmployeeId(

e.target.value,

)

}

/>

<Input

label="Department"

value={department}

onChange={(e)=>

setDepartment(

e.target.value,

)

}

/>

<Input

label="Supervisor"

value={supervisor}

onChange={(e)=>

setSupervisor(

e.target.value,

)

}

/>

<Button

onClick={save}

>

Create Onboarding

</Button>

</div>

</Card>

);

}