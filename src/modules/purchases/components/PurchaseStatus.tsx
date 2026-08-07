import PurchaseStatusBadge

from "./PurchaseStatusBadge";

type Props={

status:string;

};

export default function PurchaseStatus({

status,

}:Props){

return(

<PurchaseStatusBadge

status={status}

/>

);

}