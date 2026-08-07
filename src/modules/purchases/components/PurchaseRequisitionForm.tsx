import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreatePurchaseRequisition

}

from "../hooks/useCreatePurchaseRequisition";

export default function PurchaseRequisitionForm(){

const{

create,

}=

useCreatePurchaseRequisition();

const[

requisitionNumber,

setRequisitionNumber,

]=

useState("");

const[

department,

setDepartment,

]=

useState("");

const[

requestedBy,

setRequestedBy,

]=

useState("");

const[

requestDate,

setRequestDate,

]=

useState("");

const[

requiredDate,

setRequiredDate,

]=

useState("");

const[

purpose,

setPurpose,

]=

useState("");

const[

total,

setTotal,

]=

useState(0);

async function save(){

await create(

requisitionNumber,

department,

requestedBy,

requestDate,

requiredDate,

purpose,

total,

);

setRequisitionNumber("");

setDepartment("");

setRequestedBy("");

setRequestDate("");

setRequiredDate("");

setPurpose("");

setTotal(0);

}

return(

<Card>

<div className="space-y-4">

<Input

label="Requisition No."

value={requisitionNumber}

onChange={(e)=>setRequisitionNumber(e.target.value)}

/>

<Input

label="Department"

value={department}

onChange={(e)=>setDepartment(e.target.value)}

/>

<Input

label="Requested By"

value={requestedBy}

onChange={(e)=>setRequestedBy(e.target.value)}

/>

<Input

label="Request Date"

type="date"

value={requestDate}

onChange={(e)=>setRequestDate(e.target.value)}

/>

<Input

label="Required Date"

type="date"

value={requiredDate}

onChange={(e)=>setRequiredDate(e.target.value)}

/>

<Input

label="Purpose"

value={purpose}

onChange={(e)=>setPurpose(e.target.value)}

/>

<Input

label="Estimated Cost"

type="number"

value={total}

onChange={(e)=>setTotal(Number(e.target.value))}

/>

<Button

onClick={save}

>

Save Requisition

</Button>

</div>

</Card>

);

}