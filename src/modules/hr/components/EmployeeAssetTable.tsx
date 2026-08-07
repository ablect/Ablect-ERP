import {

useEmployeeAssets

}

from "../hooks/useEmployeeAssets";

import {

useDeleteEmployeeAsset

}

from "../hooks/useDeleteEmployeeAsset";

import EmployeeAssetActions

from "./EmployeeAssetActions";

import EmployeeAssetEmptyState

from "./EmployeeAssetEmptyState";

export default function EmployeeAssetTable(){

const{

assets,

}=

useEmployeeAssets();

const{

remove,

}=

useDeleteEmployeeAsset();

if(

assets.length===0

){

return(

<EmployeeAssetEmptyState/>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Employee

</th>

<th className="p-3">

Asset

</th>

<th className="p-3">

Category

</th>

<th className="p-3">

Serial No.

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

{assets.map(asset=>(

<tr

key={asset.id}

className="border-t"

>

<td className="p-3">

{asset.employeeId}

</td>

<td className="p-3">

{asset.assetName}

</td>

<td className="p-3">

{asset.assetCategory}

</td>

<td className="p-3">

{asset.serialNumber}

</td>

<td className="p-3">

{asset.status}

</td>

<td className="p-3">

<EmployeeAssetActions

onEdit={()=>{}}

onDelete={()=>

remove(

asset.id,

)

}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}