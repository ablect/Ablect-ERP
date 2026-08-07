import {

useFixedAssets

}

from "../hooks/useFixedAssets";

import {

useDeleteFixedAsset

}

from "../hooks/useDeleteFixedAsset";

import FixedAssetActions

from "./FixedAssetActions";

import FixedAssetEmptyState

from "./FixedAssetEmptyState";

export default function FixedAssetTable(){

const{

assets,

}=

useFixedAssets();

const{

remove,

}=

useDeleteFixedAsset();

if(assets.length===0){

return<FixedAssetEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Code</th>

<th className="p-3">Asset</th>

<th className="p-3">Category</th>

<th className="p-3">Value</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{assets.map(asset=>(

<tr

key={asset.id}

className="border-t"

>

<td className="p-3">

{asset.assetCode}

</td>

<td className="p-3">

{asset.assetName}

</td>

<td className="p-3">

{asset.category}

</td>

<td className="p-3">

₦{asset.currentValue.toLocaleString()}

</td>

<td className="p-3">

{asset.status}

</td>

<td className="p-3">

<FixedAssetActions

onEdit={()=>{}}

onDelete={()=>remove(asset.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}