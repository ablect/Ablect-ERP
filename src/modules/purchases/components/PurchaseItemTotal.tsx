type Props={

quantity:number;

unitCost:number;

};

export default function PurchaseItemTotal({

quantity,

unitCost,

}:Props){

const total=

quantity*

unitCost;

return(

<div className="font-semibold">

₦{total.toLocaleString()}

</div>

);

}