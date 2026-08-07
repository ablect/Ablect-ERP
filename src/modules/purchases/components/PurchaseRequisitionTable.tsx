import {

usePurchaseRequisitions

}

from "../hooks/usePurchaseRequisitions";

import {

useDeletePurchaseRequisition

}

from "../hooks/useDeletePurchaseRequisition";

import PurchaseRequisitionActions

from "./PurchaseRequisitionActions";

import PurchaseRequisitionEmptyState

from "./PurchaseRequisitionEmptyState";

export default function PurchaseRequisitionTable(){

const{

requisitions,

}=

usePurchaseRequisitions();

const{

remove,

}=

useDeletePurchaseRequisition();

if(requisitions.length===0){

return<PurchaseRequisitionEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Number</th>

<th className="p-3">Department</th>

<th className="p-3">Requested By</th>

<th className="p-3">Required Date</th>

<th className="p-3">Amount</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{requisitions.map(requisition=>(

<tr

key={requisition.id}

className="border-t"

>

<td className="p-3">

{requisition.requisitionNumber}

</td>

<td className="p-3">

{requisition.department}

</td>

<td className="p-3">

{requisition.requestedBy}

</td>

<td className="p-3">

{requisition.requiredDate}

</td>

<td className="p-3">

₦{requisition.total.toLocaleString()}

</td>

<td className="p-3">

{requisition.status}

</td>

<td className="p-3">

<PurchaseRequisitionActions

onEdit={()=>{}}

onDelete={()=>remove(requisition.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}