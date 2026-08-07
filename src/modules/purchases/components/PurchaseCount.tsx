import {

usePurchaseOrders

}

from "../hooks/usePurchaseOrders";

export default function PurchaseCount(){

const{

orders,

}=

usePurchaseOrders();

return(

<p>

Total Purchase Orders:

{" "}

{orders.length}

</p>

);

}