import {

useInventory

}

from "../hooks/useInventory";

import {

useDeleteInventoryItem

}

from "../hooks/useDeleteInventoryItem";

import InventoryActions

from "./InventoryActions";

import InventoryEmptyState

from "./InventoryEmptyState";

export default function InventoryTable(){

const{

items,

}=

useInventory();

const{

remove,

}=

useDeleteInventoryItem();

if(items.length===0){

return<InventoryEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">SKU</th>

<th className="p-3">Item</th>

<th className="p-3">Warehouse</th>

<th className="p-3">Qty</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{items.map(item=>(

<tr

key={item.id}

className="border-t"

>

<td className="p-3">

{item.sku}

</td>

<td className="p-3">

{item.itemName}

</td>

<td className="p-3">

{item.warehouse}

</td>

<td className="p-3">

{item.quantity}

</td>

<td className="p-3">

{item.status}

</td>

<td className="p-3">

<InventoryActions

onEdit={()=>{}}

onDelete={()=>remove(item.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}