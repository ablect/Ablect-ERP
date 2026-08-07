import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateApplicant

}

from "../hooks/useCreateApplicant";

export default function ApplicantForm(){

const{

create,

}=

useCreateApplicant();

const[

fullName,

setFullName,

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

position,

setPosition,

]=

useState("");

async function save(){

await create(

fullName,

email,

phone,

position,

);

setFullName("");

setEmail("");

setPhone("");

setPosition("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Full Name"

value={fullName}

onChange={(e)=>

setFullName(

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

label="Position"

value={position}

onChange={(e)=>

setPosition(

e.target.value,

)

}

/>

<Button

onClick={save}

>

Save Applicant

</Button>

</div>

</Card>

);

}