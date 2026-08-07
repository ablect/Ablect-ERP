import {

useSuppliers

}

from "../hooks/useSuppliers";

export default function SupplierTable(){

const{

suppliers,

}=

useSuppliers();

if(suppliers.length===0){

return(

<p>

No suppliers found.

</p>

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

Contact Person

</th>

<th className="p-3 text-left">

Phone

</th>

<th className="p-3 text-left">

Email

</th>

</tr>

</thead>

<tbody>

{suppliers.map(supplier=>(

<tr

key={supplier.id}

className="border-t"

>

<td className="p-3">

{supplier.name}

</td>

<td className="p-3">

{supplier.contactPerson}

</td>

<td className="p-3">

{supplier.phone}

</td>

<td className="p-3">

{supplier.email}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}