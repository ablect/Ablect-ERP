import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateDepreciationRecord

}

from "../hooks/useCreateDepreciationRecord";

export default function DepreciationForm(){

const{

create,

}=

useCreateDepreciationRecord();

const[assetId,setAssetId]=useState("");

const[date,setDate]=useState("");

const[method,setMethod]=

useState<

"Straight Line"

|

"Reducing Balance"

>("Straight Line");

const[amount,setAmount]=useState(0);

const[accumulated,setAccumulated]=useState(0);

const[bookValue,setBookValue]=useState(0);

async function save(){

await create(

assetId,

date,

method,

amount,

accumulated,

bookValue,

);

setAssetId("");

setDate("");

setMethod("Straight Line");

setAmount(0);

setAccumulated(0);

setBookValue(0);

}

return(

<Card>

<div className="space-y-4">

<Input

label="Asset ID"

value={assetId}

onChange={(e)=>setAssetId(e.target.value)}

/>

<Input

label="Date"

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

/>

<Input

label="Method"

value={method}

onChange={(e)=>

setMethod(

e.target.value as

"Straight Line"

|

"Reducing Balance"

)

}

/>

<Input

label="Depreciation Amount"

type="number"

value={amount}

onChange={(e)=>setAmount(Number(e.target.value))}

/>

<Input

label="Accumulated"

type="number"

value={accumulated}

onChange={(e)=>setAccumulated(Number(e.target.value))}

/>

<Input

label="Book Value"

type="number"

value={bookValue}

onChange={(e)=>setBookValue(Number(e.target.value))}

/>

<Button

onClick={save}

>

Post Depreciation

</Button>

</div>

</Card>

);

}