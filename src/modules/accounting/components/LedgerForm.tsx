import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateLedgerEntry

}

from "../hooks/useCreateLedgerEntry";

export default function LedgerForm(){

const{

create,

}=

useCreateLedgerEntry();

const[

account,

setAccount,

]=

useState("");

const[

description,

setDescription,

]=

useState("");

const[

debit,

setDebit,

]=

useState(0);

const[

credit,

setCredit,

]=

useState(0);

const[

reference,

setReference,

]=

useState("");

async function save(){

await create(

account,

description,

debit,

credit,

reference,

);

setAccount("");

setDescription("");

setDebit(0);

setCredit(0);

setReference("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Account"

value={account}

onChange={(e)=>

setAccount(

e.target.value,

)

}

/>

<Input

label="Description"

value={description}

onChange={(e)=>

setDescription(

e.target.value,

)

}

/>

<Input

label="Debit"

type="number"

value={debit}

onChange={(e)=>

setDebit(

Number(

e.target.value,

)

)

}

/>

<Input

label="Credit"

type="number"

value={credit}

onChange={(e)=>

setCredit(

Number(

e.target.value,

)

)

}

/>

<Input

label="Reference"

value={reference}

onChange={(e)=>

setReference(

e.target.value,

)

}

/>

<Button

onClick={save}

>

Save Entry

</Button>

</div>

</Card>

);

}