type Props={

total:number;

};

export default function PurchaseTotals({

total,

}:Props){

return(

<div className="rounded-xl border bg-slate-50 p-6">

<div className="flex justify-between">

<span>

Purchase Total

</span>

<strong>

₦{total.toLocaleString()}

</strong>

</div>

</div>

);

}