import {

usePurchaseOrders

}

from "../hooks/usePurchaseOrders";

import {

useDeletePurchaseOrder

}

from "../hooks/useDeletePurchaseOrder";

import PurchaseActions

from "./PurchaseActions";

import PurchaseEmptyState

from "./PurchaseEmptyState";

export default function PurchaseTable(){

const{

orders,

}=

usePurchaseOrders();

const{

remove,

}=

useDeletePurchaseOrder();

if(orders.length===0){

return<PurchaseEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

PO Number

</th>

<th className="p-3">

Supplier

</th>

<th className="p-3">

Order Date

</th>

<th className="p-3">

Expected Date

</th>

<th className="p-3">

Total

</th>

<th className="p-3">

Status

</th>

<th className="p-3">

Actions

</th>

</tr>

</thead>

<tbody>

{orders.map(order=>(

<tr

key={order.id}

className="border-t"

>

<td className="p-3">

{order.poNumber}

</td>

<td className="p-3">

{order.supplierId}

</td>

<td className="p-3">

{order.orderDate}

</td>

<td className="p-3">

{order.expectedDate}

</td>

<td className="p-3">

₦{order.total.toLocaleString()}

</td>

<td className="p-3">

{order.status}

</td>

<td className="p-3">

<PurchaseActions

onEdit={()=>{}}

onDelete={()=>remove(order.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}