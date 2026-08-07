import {

useStockMovements

}

from "../hooks/useStockMovements";

export default function StockMovementTable(){

const{

movements,

}=

useStockMovements();

if(

movements.length===0

){

return(

<div className="rounded-xl border border-dashed p-12 text-center">

No stock movements.

</div>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3 text-left">

Reference

</th>

<th className="p-3 text-left">

Type

</th>

<th className="p-3 text-left">

Quantity

</th>

<th className="p-3 text-left">

Balance

</th>

</tr>

</thead>

<tbody>

{movements.map(

movement=>(

<tr

key={movement.id}

className="border-t"

>

<td className="p-3">

{movement.reference}

</td>

<td className="p-3">

{movement.type}

</td>

<td className="p-3">

{movement.quantity}

</td>

<td className="p-3">

{movement.balance}

</td>

</tr>

)

)}

</tbody>

</table>

</div>

);

}