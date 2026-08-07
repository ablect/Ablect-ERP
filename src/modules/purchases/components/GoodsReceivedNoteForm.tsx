import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateGoodsReceivedNote

}

from "../hooks/useCreateGoodsReceivedNote";

export default function GoodsReceivedNoteForm(){

const{

create,

}=

useCreateGoodsReceivedNote();

const[grnNumber,setGrnNumber]=useState("");

const[purchaseOrderId,setPurchaseOrderId]=useState("");

const[supplierId,setSupplierId]=useState("");

const[warehouseId,setWarehouseId]=useState("");

const[receivedBy,setReceivedBy]=useState("");

const[receivedDate,setReceivedDate]=useState("");

const[remarks,setRemarks]=useState("");

async function save(){

await create(

grnNumber,

purchaseOrderId,

supplierId,

warehouseId,

receivedBy,

receivedDate,

remarks,

);

setGrnNumber("");

setPurchaseOrderId("");

setSupplierId("");

setWarehouseId("");

setReceivedBy("");

setReceivedDate("");

setRemarks("");

}

return(

<Card>

<div className="space-y-4">

<Input

label="GRN Number"

value={grnNumber}

onChange={(e)=>setGrnNumber(e.target.value)}

/>

<Input

label="Purchase Order ID"

value={purchaseOrderId}

onChange={(e)=>setPurchaseOrderId(e.target.value)}

/>

<Input

label="Supplier ID"

value={supplierId}

onChange={(e)=>setSupplierId(e.target.value)}

/>

<Input

label="Warehouse ID"

value={warehouseId}

onChange={(e)=>setWarehouseId(e.target.value)}

/>

<Input

label="Received By"

value={receivedBy}

onChange={(e)=>setReceivedBy(e.target.value)}

/>

<Input

label="Received Date"

type="date"

value={receivedDate}

onChange={(e)=>setReceivedDate(e.target.value)}

/>

<Input

label="Remarks"

value={remarks}

onChange={(e)=>setRemarks(e.target.value)}

/>

<Button

onClick={save}

>

Save GRN

</Button>

</div>

</Card>

);

}