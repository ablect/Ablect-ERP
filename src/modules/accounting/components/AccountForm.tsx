import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateAccount

}

from "../hooks/useCreateAccount";

export default function AccountForm(){

const{

create,

}=

useCreateAccount();

const[

code,

setCode,

]=useState("");

const[

name,

setName,

]=useState("");

const[

type,

setType,

]=useState<

"Asset"

|

"Liability"

|

"Equity"

|

"Revenue"

|

"Expense"

>("Asset");

async function save(){

await create(

code,

name,

type,

);

setCode("");

setName("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Account Code"

value={code}

onChange={(e)=>setCode(e.target.value)}

/>

<Input

label="Account Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>

<select

className="w-full rounded border p-2"

value={type}

onChange={(e)=>

setType(

e.target.value as

"Asset"

|

"Liability"

|

"Equity"

|

"Revenue"

|

"Expense"

)

}

>

<option>Asset</option>

<option>Liability</option>

<option>Equity</option>

<option>Revenue</option>

<option>Expense</option>

</select>

<Button

onClick={save}

>

Save Account

</Button>

</div>

</Card>

);

}