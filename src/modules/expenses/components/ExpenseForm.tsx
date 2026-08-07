import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateExpense

}

from "../hooks/useCreateExpense";

export default function ExpenseForm(){

const{

create,

}=

useCreateExpense();

const[

title,

setTitle,

]=

useState("");

const[

category,

setCategory,

]=

useState("");

const[

amount,

setAmount,

]=

useState(0);

const[

vendor,

setVendor,

]=

useState("");

const[

notes,

setNotes,

]=

useState("");

async function save(){

await create(

title,

category,

amount,

vendor,

notes,

);

setTitle("");

setCategory("");

setAmount(0);

setVendor("");

setNotes("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Title"

value={title}

onChange={(e)=>

setTitle(e.target.value)

}

/>

<Input

label="Category"

value={category}

onChange={(e)=>

setCategory(e.target.value)

}

/>

<Input

label="Amount"

type="number"

value={amount}

onChange={(e)=>

setAmount(

Number(e.target.value)

)

}

/>

<Input

label="Vendor"

value={vendor}

onChange={(e)=>

setVendor(e.target.value)

}

/>

<Input

label="Notes"

value={notes}

onChange={(e)=>

setNotes(e.target.value)

}

/>

<Button

onClick={save}

>

Save Expense

</Button>

</div>

</Card>

);

}