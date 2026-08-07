import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateMaintenanceRecord

}

from "../hooks/useCreateMaintenanceRecord";

export default function MaintenanceForm(){

const{

create,

}=

useCreateMaintenanceRecord();

const[assetId,setAssetId]=useState("");

const[type,setType]=

useState<

"Preventive"

|

"Corrective"

>("Preventive");

const[provider,setProvider]=useState("");

const[scheduledDate,setScheduledDate]=useState("");

const[completedDate,setCompletedDate]=useState("");

const[cost,setCost]=useState(0);

const[description,setDescription]=useState("");

async function save(){

await create(

assetId,

type,

provider,

scheduledDate,

completedDate,

cost,

description,

);

setAssetId("");

setType("Preventive");

setProvider("");

setScheduledDate("");

setCompletedDate("");

setCost(0);

setDescription("");

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

label="Maintenance Type"

value={type}

onChange={(e)=>

setType(

e.target.value as

"Preventive"

|

"Corrective"

)

}

/>

<Input

label="Service Provider"

value={provider}

onChange={(e)=>setProvider(e.target.value)}

/>

<Input

label="Scheduled Date"

type="date"

value={scheduledDate}

onChange={(e)=>setScheduledDate(e.target.value)}

/>

<Input

label="Completed Date"

type="date"

value={completedDate}

onChange={(e)=>setCompletedDate(e.target.value)}

/>

<Input

label="Maintenance Cost"

type="number"

value={cost}

onChange={(e)=>setCost(Number(e.target.value))}

/>

<Input

label="Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

/>

<Button

onClick={save}

>

Save Maintenance

</Button>

</div>

</Card>

);

}