import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateCustomerInvoice

}

from "../hooks/useCreateCustomerInvoice";

export default function CustomerInvoiceForm(){

const{

create,

}=

useCreateCustomerInvoice();

const[

invoiceNumber,

setInvoiceNumber,

]=useState("");

const[

customerId,

setCustomerId,

]=useState("");

const[

salesOrderId,

setSalesOrderId,

]=useState("");

const[

invoiceDate,

setInvoiceDate,

]=useState("");

const[

dueDate,

setDueDate,

]=useState("");

const[

amount,

setAmount,

]=useState(0);

async function save(){

await create(

invoiceNumber,

customerId,

salesOrderId,

invoiceDate,

dueDate,

amount,

);

setInvoiceNumber("");

setCustomerId("");

setSalesOrderId("");

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

label="Customer ID"

value={customerId}

onChange={(e)=>setCustomerId(e.target.value)}

/>

<Input

label="Sales Order ID"

value={salesOrderId}

onChange={(e)=>setSalesOrderId(e.target.value)}

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

label="Amount"

type="number"

value={amount}

onChange={(e)=>

setAmount(

Number(e.target.value)

)

}

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