import {

useDepreciationRecords

}

from "../hooks/useDepreciationRecords";

import DepreciationEmptyState

from "./DepreciationEmptyState";

export default function DepreciationTable(){

const{

records,

}=

useDepreciationRecords();

if(records.length===0){

return<DepreciationEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Asset

</th>

<th className="p-3">

Date

</th>

<th className="p-3">

Method

</th>

<th className="p-3">

Amount

</th>

<th className="p-3">

Accumulated

</th>

<th className="p-3">

Book Value

</th>

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

{record.depreciationDate}

</td>

<td className="p-3">

{record.method}

</td>

<td className="p-3">

₦{record.depreciationAmount.toLocaleString()}

</td>

<td className="p-3">

₦{record.accumulatedDepreciation.toLocaleString()}

</td>

<td className="p-3">

₦{record.bookValue.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}