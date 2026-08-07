import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import PurchasePaymentForm

from "./PurchasePaymentForm";

type Props={

open:boolean;

onClose:()=>void;

};

export default function PurchasePaymentModal({

open,

onClose,

}:Props){

const[

amount,

setAmount,

]=

useState(0);

if(!open){

return null;

}

return(

<Card>

<h2 className="text-xl font-semibold">

Supplier Payment

</h2>

<div className="mt-4">

<PurchasePaymentForm

amount={amount}

setAmount={setAmount}

onSubmit={onClose}

/>

</div>

</Card>

);

}