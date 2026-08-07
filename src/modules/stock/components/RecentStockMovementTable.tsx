import {

useRecentStockMovements

}

from "../hooks/useRecentStockMovements";

export default function RecentStockMovementTable(){

const{

movements,

}=

useRecentStockMovements();

return(

<div className="rounded-xl border">

<table className="min-w-full">

<tbody>

{movements.map(movement=>(

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

</tr>

))}

</tbody>

</table>

</div>

);

}