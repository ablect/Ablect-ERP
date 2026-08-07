import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateSupplierInvoice

}

from "../hooks/useCreateSupplierInvoice";

export default function SupplierInvoiceForm(){

const{

create,

}=

useCreateSupplierInvoice();

const[

invoiceNumber,

setInvoiceNumber,

]=

useState("");

const[

supplierId,

setSupplierId,

]=

useState("");

const[

purchaseOrderId,

setPurchaseOrderId,

]=

useState("");

const[

invoiceDate,

setInvoiceDate,

]=

useState("");

const[

dueDate,

setDueDate,

]=

useState("");

const[

amount,

setAmount,

]=

useState(0);

async function save(){

await create(

invoiceNumber,

supplierId,

purchaseOrderId,

invoiceDate,

dueDate,

amount,

);

setInvoiceNumber("");

setSupplierId("");

setPurchaseOrderId("");

setInvoiceDate("");

setDueDate("");

setAmount(0);

}

return(

<Card>

<div className="space-y-4">

<Input

label="Invoice Number"

value={invoiceNumber}

onChange={(e)=>setInvoiceNumber(e.target.value)}

/>

<Input

label="Supplier ID"

value={supplierId}

onChange={(e)=>setSupplierId(e.target.value)}

/>

<Input

label="Purchase Order ID"

value={purchaseOrderId}

onChange={(e)=>setPurchaseOrderId(e.target.value)}

/>

<Input

label="Invoice Date"

type="date"

value={invoiceDate}

onChange={(e)=>setInvoiceDate(e.target.value)}

/>

<Input

label="Due Date"

type="date"

value={dueDate}

onChange={(e)=>setDueDate(e.target.value)}

/>

<Input

label="Invoice Amount"

type="number"

value={amount}

onChange={(e)=>setAmount(Number(e.target.value))}

/>

<Button

onClick={save}

>

Save Invoice

</Button>

</div>

</Card>

);

}