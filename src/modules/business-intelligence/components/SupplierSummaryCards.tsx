import Card

from "../../../components/ui/Card";

import {

useSupplierSummary

}

from "../hooks/useSupplierSummary";

export default function SupplierSummaryCards(){

const{

purchaseValue,

purchaseOrders,

averageRating,

deliveryRate,

}=

useSupplierSummary();

return(

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

<Card>

<p>Purchases</p>

<h2>

₦{purchaseValue.toLocaleString()}

</h2>

</Card>

<Card>

<p>Orders</p>

<h2>{purchaseOrders}</h2>

</Card>

<Card>

<p>Supplier Rating</p>

<h2>{averageRating.toFixed(1)}/5</h2>

</Card>

<Card>

<p>On-Time Delivery</p>

<h2>{deliveryRate.toFixed(1)}%</h2>

</Card>

</div>

);

}