import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateStockMovement

}

from "../hooks/useCreateStockMovement";

export default function StockMovementForm(){

const{

create,

}=

useCreateStockMovement();

const[itemId,setItemId]=useState("");

const[warehouseId,setWarehouseId]=useState("");

const[type,setType]=

useState<

"Stock In"

|

"Stock Out"

|

"Transfer"

|

"Adjustment"

>("Stock In");

const[quantity,setQuantity]=useState(0);

const[unitCost,setUnitCost]=useState(0);

const[reference,setReference]=useState("");

const[movementDate,setMovementDate]=useState("");

const[remarks,setRemarks]=useState("");

async function save(){

await create(

itemId,

warehouseId,

type,

quantity,

unitCost,

reference,

movementDate,

remarks,

);

setItemId("");

setWarehouseId("");

setType("Stock In");

setQuantity(0);

setUnitCost(0);

setReference("");

setMovementDate("");

setRemarks("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Item ID"

value={itemId}

onChange={(e)=>setItemId(e.target.value)}

/>

<Input

label="Warehouse ID"

value={warehouseId}

onChange={(e)=>setWarehouseId(e.target.value)}

/>

<Input

label="Movement Type"

value={type}

onChange={(e)=>

setType(

e.target.value as

"Stock In"

|

"Stock Out"

|

"Transfer"

|

"Adjustment"

)

}

/>

<Input

label="Quantity"

type="number"

value={quantity}

onChange={(e)=>setQuantity(Number(e.target.value))}

/>

<Input

label="Unit Cost"

type="number"

value={unitCost}

onChange={(e)=>setUnitCost(Number(e.target.value))}

/>

<Input

label="Reference"

value={reference}

onChange={(e)=>setReference(e.target.value)}

/>

<Input

label="Movement Date"

type="date"

value={movementDate}

onChange={(e)=>setMovementDate(e.target.value)}

/>

<Input

label="Remarks"

value={remarks}

onChange={(e)=>setRemarks(e.target.value)}

/>

<Button

onClick={save}

>

Save Movement

</Button>

</div>

</Card>

);

}