type Props={

status:string;

};

export default function PurchaseStatusBadge({

status,

}:Props){

const color=

status==="Completed"

?"bg-green-100 text-green-700"

:"bg-yellow-100 text-yellow-700";

return(

<span

className={`rounded-full px-3 py-1 text-xs font-medium ${color}`}

>

{status}

</span>

);

}