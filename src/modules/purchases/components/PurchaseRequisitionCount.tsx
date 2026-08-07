import {

usePurchaseRequisitions

}

from "../hooks/usePurchaseRequisitions";

export default function PurchaseRequisitionCount(){

const{

requisitions,

}=

usePurchaseRequisitions();

return(

<p>

Total Requisitions:

{" "}

{requisitions.length}

</p>

);

}