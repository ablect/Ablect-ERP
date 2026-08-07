import Card

from "../../../components/ui/Card";

import {

usePurchaseStatistics

}

from "../hooks/usePurchaseStatistics";

export default function PurchaseStatistics(){

const{

total,

draft,

pending,

approved,

received,

totalValue,

}=

usePurchaseStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total Purchase Orders: {total}</p>

<p>Draft: {draft}</p>

<p>Pending: {pending}</p>

<p>Approved: {approved}</p>

<p>Received: {received}</p>

<p>Total Value: ₦{totalValue.toLocaleString()}</p>

</div>

</Card>

);

}