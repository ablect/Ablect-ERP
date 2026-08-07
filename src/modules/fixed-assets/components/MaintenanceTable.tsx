import {

useMaintenanceRecords

}

from "../hooks/useMaintenanceRecords";

import {

useDeleteMaintenanceRecord

}

from "../hooks/useDeleteMaintenanceRecord";

import MaintenanceActions

from "./MaintenanceActions";

import MaintenanceEmptyState

from "./MaintenanceEmptyState";

export default function MaintenanceTable(){

const{

records,

}=

useMaintenanceRecords();

const{

remove,

}=

useDeleteMaintenanceRecord();

if(records.length===0){

return<MaintenanceEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Asset</th>

<th className="p-3">Type</th>

<th className="p-3">Provider</th>

<th className="p-3">Cost</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{records.map(record=>(

<tr

key={record.id}

className="border-t"

>

<td className="p-3">

{record.assetId}

</td>

<td className="p-3">

{record.maintenanceType}

</td>

<td className="p-3">

{record.provider}

</td>

<td className="p-3">

₦{record.cost.toLocaleString()}

</td>

<td className="p-3">

{record.status}

</td>

<td className="p-3">

<MaintenanceActions

onEdit={()=>{}}

onDelete={()=>remove(record.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}