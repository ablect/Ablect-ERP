import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateEmployee

}

from "../hooks/useCreateEmployee";

export default function EmployeeForm(){

const{

create,

}=

useCreateEmployee();

const[

firstName,

setFirstName,

]=

useState("");

const[

lastName,

setLastName,

]=

useState("");

const[

email,

setEmail,

]=

useState("");

const[

phone,

setPhone,

]=

useState("");

const[

department,

setDepartment,

]=

useState("");

const[

position,

setPosition,

]=

useState("");

const[

salary,

setSalary,

]=

useState(0);

async function save(){

await create(

firstName,

lastName,

email,

phone,

department,

position,

salary,

);

setFirstName("");

setLastName("");

setEmail("");

setPhone("");

setDepartment("");

setPosition("");

setSalary(0);

}

return(

<Card>

<div className="space-y-4">

<Input

label="First Name"

value={firstName}

onChange={(e)=>

setFirstName(

e.target.value,

)

}

/>

<Input

label="Last Name"

value={lastName}

onChange={(e)=>

setLastName(

e.target.value,

)

}

/>

<Input

label="Email"

value={email}

onChange={(e)=>

setEmail(

e.target.value,

)

}

/>

<Input

label="Phone"

value={phone}

onChange={(e)=>

setPhone(

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

label="Position"

value={position}

onChange={(e)=>

setPosition(

e.target.value,

)

}

/>

<Input

label="Salary"

type="number"

value={salary}

onChange={(e)=>

setSalary(

Number(

e.target.value,

)

)

}

/>

<Button

onClick={save}

>

Save Employee

</Button>

</div>

</Card>

);

}