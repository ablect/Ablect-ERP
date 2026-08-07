import {

useStockMovements

}

from "../hooks/useStockMovements";

import {

useDeleteStockMovement

}

from "../hooks/useDeleteStockMovement";

import StockMovementActions

from "./StockMovementActions";

import StockMovementEmptyState

from "./StockMovementEmptyState";

export default function StockMovementTable(){

const{

movements,

}=

useStockMovements();

const{

remove,

}=

useDeleteStockMovement();

if(movements.length===0){

return<StockMovementEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Item</th>

<th className="p-3">Warehouse</th>

<th className="p-3">Type</th>

<th className="p-3">Qty</th>

<th className="p-3">Reference</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{movements.map(movement=>(

<tr

key={movement.id}

className="border-t"

>

<td className="p-3">

{movement.itemId}

</td>

<td className="p-3">

{movement.warehouseId}

</td>

<td className="p-3">

{movement.movementType}

</td>

<td className="p-3">

{movement.quantity}

</td>

<td className="p-3">

{movement.reference}

</td>

<td className="p-3">

<StockMovementActions

onEdit={()=>{}}

onDelete={()=>remove(movement.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}