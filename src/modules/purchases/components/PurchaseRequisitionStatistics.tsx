import Card

from "../../../components/ui/Card";

import {

usePurchaseRequisitionStatistics

}

from "../hooks/usePurchaseRequisitionStatistics";

export default function PurchaseRequisitionStatistics(){

const{

total,

draft,

pending,

approved,

totalValue,

}=

usePurchaseRequisitionStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total Requisitions: {total}</p>

<p>Draft: {draft}</p>

<p>Pending: {pending}</p>

<p>Approved: {approved}</p>

<p>Total Value: ₦{totalValue.toLocaleString()}</p>

</div>

</Card>

);

}