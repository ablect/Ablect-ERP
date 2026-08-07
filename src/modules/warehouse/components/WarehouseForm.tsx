import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateWarehouse

}

from "../hooks/useCreateWarehouse";

export default function WarehouseForm(){

const{

create,

}=

useCreateWarehouse();

const[code,setCode]=useState("");

const[name,setName]=useState("");

const[location,setLocation]=useState("");

const[manager,setManager]=useState("");

const[capacity,setCapacity]=useState(0);

async function save(){

await create(

code,

name,

location,

manager,

capacity,

);

setCode("");

setName("");

setLocation("");

setManager("");

setCapacity(0);

}

return(

<Card>

<div className="space-y-4">

<Input

label="Warehouse Code"

value={code}

onChange={(e)=>setCode(e.target.value)}

/>

<Input

label="Warehouse Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>

<Input

label="Location"

value={location}

onChange={(e)=>setLocation(e.target.value)}

/>

<Input

label="Manager"

value={manager}

onChange={(e)=>setManager(e.target.value)}

/>

<Input

label="Capacity"

type="number"

value={capacity}

onChange={(e)=>setCapacity(Number(e.target.value))}

/>

<Button

onClick={save}

>

Save Warehouse

</Button>

</div>

</Card>

);

}