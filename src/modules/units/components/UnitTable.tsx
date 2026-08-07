import {

useUnitList

}

from "../hooks/useUnitList";

export default function UnitTable(){

const{

units,

}=useUnitList();

if(units.length===0){

return(

<div className="rounded-xl border border-dashed p-12 text-center">

No units available.

</div>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3 text-left">

Name

</th>

<th className="p-3 text-left">

Symbol

</th>

<th className="p-3 text-left">

Description

</th>

</tr>

</thead>

<tbody>

{units.map(unit=>(

<tr

key={unit.id}

className="border-t"

>

<td className="p-3">

{unit.name}

</td>

<td className="p-3">

{unit.symbol}

</td>

<td className="p-3">

{unit.description}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}