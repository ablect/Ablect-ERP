import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateEmployeeAsset

}

from "../hooks/useCreateEmployeeAsset";

export default function EmployeeAssetForm(){

const{

create,

}=

useCreateEmployeeAsset();

const[

employeeId,

setEmployeeId,

]=

useState("");

const[

assetName,

setAssetName,

]=

useState("");

const[

assetCategory,

setAssetCategory,

]=

useState("");

const[

serialNumber,

setSerialNumber,

]=

useState("");

async function save(){

await create(

employeeId,

assetName,

assetCategory,

serialNumber,

);

setEmployeeId("");

setAssetName("");

setAssetCategory("");

setSerialNumber("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Employee ID"

value={employeeId}

onChange={(e)=>

setEmployeeId(

e.target.value,

)

}

/>

<Input

label="Asset Name"

value={assetName}

onChange={(e)=>

setAssetName(

e.target.value,

)

}

/>

<Input

label="Category"

value={assetCategory}

onChange={(e)=>

setAssetCategory(

e.target.value,

)

}

/>

<Input

label="Serial Number"

value={serialNumber}

onChange={(e)=>

setSerialNumber(

e.target.value,

)

}

/>

<Button

onClick={save}

>

Assign Asset

</Button>

</div>

</Card>

);

}