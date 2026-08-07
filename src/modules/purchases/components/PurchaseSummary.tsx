type Props={

amount:number;

};

export default function PurchaseSummary({

amount,

}:Props){

return(

<div className="rounded-xl border bg-slate-50 p-6">

<p className="text-sm text-slate-500">

Purchase Total

</p>

<h2 className="mt-2 text-3xl font-bold">

₦{amount.toLocaleString()}

</h2>

</div>

);

}