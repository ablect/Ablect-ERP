import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateFixedAsset

}

from "../hooks/useCreateFixedAsset";

export default function FixedAssetForm(){

const{

create,

}=

useCreateFixedAsset();

const[assetCode,setAssetCode]=useState("");

const[assetName,setAssetName]=useState("");

const[category,setCategory]=useState("");

const[purchaseDate,setPurchaseDate]=useState("");

const[purchaseCost,setPurchaseCost]=useState(0);

const[usefulLife,setUsefulLife]=useState(0);

const[salvageValue,setSalvageValue]=useState(0);

const[location,setLocation]=useState("");

async function save(){

await create(

assetCode,

assetName,

category,

purchaseDate,

purchaseCost,

usefulLife,

salvageValue,

location,

);

setAssetCode("");

setAssetName("");

setCategory("");

setPurchaseDate("");

setPurchaseCost(0);

setUsefulLife(0);

setSalvageValue(0);

setLocation("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Asset Code"

value={assetCode}

onChange={(e)=>setAssetCode(e.target.value)}

/>

<Input

label="Asset Name"

value={assetName}

onChange={(e)=>setAssetName(e.target.value)}

/>

<Input

label="Category"

value={category}

onChange={(e)=>setCategory(e.target.value)}

/>

<Input

label="Purchase Date"

type="date"

value={purchaseDate}

onChange={(e)=>setPurchaseDate(e.target.value)}

/>

<Input

label="Purchase Cost"

type="number"

value={purchaseCost}

onChange={(e)=>setPurchaseCost(Number(e.target.value))}

/>

<Input

label="Useful Life (Years)"

type="number"

value={usefulLife}

onChange={(e)=>setUsefulLife(Number(e.target.value))}

/>

<Input

label="Salvage Value"

type="number"

value={salvageValue}

onChange={(e)=>setSalvageValue(Number(e.target.value))}

/>

<Input

label="Location"

value={location}

onChange={(e)=>setLocation(e.target.value)}

/>

<Button

onClick={save}

>

Save Asset

</Button>

</div>

</Card>

);

}