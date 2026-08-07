import {

useWarehouses

}

from "../hooks/useWarehouses";

import {

useDeleteWarehouse

}

from "../hooks/useDeleteWarehouse";

import WarehouseActions

from "./WarehouseActions";

import WarehouseEmptyState

from "./WarehouseEmptyState";

export default function WarehouseTable(){

const{

warehouses,

}=

useWarehouses();

const{

remove,

}=

useDeleteWarehouse();

if(warehouses.length===0){

return<WarehouseEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Code</th>

<th className="p-3">Name</th>

<th className="p-3">Location</th>

<th className="p-3">Manager</th>

<th className="p-3">Capacity</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{warehouses.map(warehouse=>(

<tr

key={warehouse.id}

className="border-t"

>

<td className="p-3">

{warehouse.code}

</td>

<td className="p-3">

{warehouse.name}

</td>

<td className="p-3">

{warehouse.location}

</td>

<td className="p-3">

{warehouse.manager}

</td>

<td className="p-3">

{warehouse.capacity}

</td>

<td className="p-3">

{warehouse.status}

</td>

<td className="p-3">

<WarehouseActions

onEdit={()=>{}}

onDelete={()=>remove(warehouse.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}