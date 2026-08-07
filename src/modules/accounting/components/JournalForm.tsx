import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateJournalEntry

}

from "../hooks/useCreateJournalEntry";

export default function JournalForm(){

const{

create,

}=

useCreateJournalEntry();

const[

journalNumber,

setJournalNumber,

]=useState("");

const[

reference,

setReference,

]=useState("");

const[

description,

setDescription,

]=useState("");

async function save(){

await create(

journalNumber,

reference,

description,

);

setJournalNumber("");

setReference("");

setDescription("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Journal Number"

value={journalNumber}

onChange={(e)=>

setJournalNumber(

e.target.value

)

}

/>

<Input

label="Reference"

value={reference}

onChange={(e)=>

setReference(

e.target.value

)

}

/>

<Input

label="Description"

value={description}

onChange={(e)=>

setDescription(

e.target.value

)

}

/>

<Button

onClick={save}

>

Save Journal

</Button>

</div>

</Card>

);

}