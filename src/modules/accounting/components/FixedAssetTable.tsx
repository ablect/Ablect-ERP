import {

useFixedAssets

}

from "../hooks/useFixedAssets";

export default function FixedAssetTable(){

const{

assets,

}=

useFixedAssets();

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead>

<tr>

<th>Asset Code</th>

<th>Name</th>

<th>Purchase Cost</th>

<th>Book Value</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{assets.map(asset=>(

<tr key={asset.id}>

<td>{asset.assetCode}</td>

<td>{asset.assetName}</td>

<td>₦{asset.purchaseCost.toLocaleString()}</td>

<td>₦{asset.currentValue.toLocaleString()}</td>

<td>{asset.status}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}