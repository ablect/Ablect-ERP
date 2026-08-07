import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateSupplier

}

from "../hooks/useCreateSupplier";

export default function SupplierForm(){

const{

create,

}=

useCreateSupplier();

const[

name,

setName,

]=

useState("");

const[

contact,

setContact,

]=

useState("");

const[

phone,

setPhone,

]=

useState("");

const[

email,

setEmail,

]=

useState("");

const[

address,

setAddress,

]=

useState("");

async function save(){

await create(

name,

contact,

phone,

email,

address,

);

setName("");

setContact("");

setPhone("");

setEmail("");

setAddress("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Supplier Name"

value={name}

onChange={(e)=>

setName(e.target.value)

}

/>

<Input

label="Contact Person"

value={contact}

onChange={(e)=>

setContact(e.target.value)

}

/>

<Input

label="Phone"

value={phone}

onChange={(e)=>

setPhone(e.target.value)

}

/>

<Input

label="Email"

value={email}

onChange={(e)=>

setEmail(e.target.value)

}

/>

<Input

label="Address"

value={address}

onChange={(e)=>

setAddress(e.target.value)

}

/>

<Button

onClick={save}

>

Save Supplier

</Button>

</div>

</Card>

);

}