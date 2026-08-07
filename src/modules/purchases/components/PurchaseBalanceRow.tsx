type Props={

label:string;

value:number;

};

export default function PurchaseBalanceRow({

label,

value,

}:Props){

return(

<div className="flex justify-between">

<span>

{label}

</span>

<strong>

₦{value.toLocaleString()}

</strong>

</div>

);

}