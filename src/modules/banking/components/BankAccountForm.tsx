import { useState }
from "react";

import Card
from "../../../components/ui/Card";

import Input
from "../../../components/ui/Input";

import Button
from "../../../components/ui/Button";

import {
useCreateBankAccount
}
from "../hooks/useCreateBankAccount";

export default function BankAccountForm(){

const{
create,
}=useCreateBankAccount();

const[
bankName,
setBankName,
]=useState("");

const[
accountName,
setAccountName,
]=useState("");

const[
accountNumber,
setAccountNumber,
]=useState("");

const[
currency,
setCurrency,
]=useState("NGN");

async function save(){

await create(

bankName,

accountName,

accountNumber,

currency,

);

setBankName("");

setAccountName("");

setAccountNumber("");

setCurrency("NGN");

}

return(

<Card>

<div className="space-y-4">

<Input
label="Bank Name"
value={bankName}
onChange={(e)=>setBankName(e.target.value)}
/>

<Input
label="Account Name"
value={accountName}
onChange={(e)=>setAccountName(e.target.value)}
/>

<Input
label="Account Number"
value={accountNumber}
onChange={(e)=>setAccountNumber(e.target.value)}
/>

<Input
label="Currency"
value={currency}
onChange={(e)=>setCurrency(e.target.value)}
/>

<Button onClick={save}>

Save Account

</Button>

</div>

</Card>

);

}