import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateInventoryItem

}

from "../hooks/useCreateInventoryItem";

export default function InventoryForm(){

const{

create,

}=

useCreateInventoryItem();

const[sku,setSku]=useState("");

const[itemName,setItemName]=useState("");

const[category,setCategory]=useState("");

const[warehouse,setWarehouse]=useState("");

const[unit,setUnit]=useState("");

const[quantity,setQuantity]=useState(0);

const[reorderLevel,setReorderLevel]=useState(0);

const[unitCost,setUnitCost]=useState(0);

const[sellingPrice,setSellingPrice]=useState(0);

async function save(){

await create(

sku,

itemName,

category,

warehouse,

unit,

quantity,

reorderLevel,

unitCost,

sellingPrice,

);

setSku("");

setItemName("");

setCategory("");

setWarehouse("");

setUnit("");

setQuantity(0);

setReorderLevel(0);

setUnitCost(0);

setSellingPrice(0);

}

return(

<Card>

<div className="space-y-4">

<Input

label="SKU"

value={sku}

onChange={(e)=>setSku(e.target.value)}

/>

<Input

label="Item Name"

value={itemName}

onChange={(e)=>setItemName(e.target.value)}

/>

<Input

label="Category"

value={category}

onChange={(e)=>setCategory(e.target.value)}

/>

<Input

label="Warehouse"

value={warehouse}

onChange={(e)=>setWarehouse(e.target.value)}

/>

<Input

label="Unit"

value={unit}

onChange={(e)=>setUnit(e.target.value)}

/>

<Input

label="Quantity"

type="number"

value={quantity}

onChange={(e)=>setQuantity(Number(e.target.value))}

/>

<Input

label="Reorder Level"

type="number"

value={reorderLevel}

onChange={(e)=>setReorderLevel(Number(e.target.value))}

/>

<Input

label="Unit Cost"

type="number"

value={unitCost}

onChange={(e)=>setUnitCost(Number(e.target.value))}

/>

<Input

label="Selling Price"

type="number"

value={sellingPrice}

onChange={(e)=>setSellingPrice(Number(e.target.value))}

/>

<Button

onClick={save}

>

Save Item

</Button>

</div>

</Card>

);

}