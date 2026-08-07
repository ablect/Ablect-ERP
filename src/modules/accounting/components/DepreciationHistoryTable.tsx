import {

useDepreciation

}

from "../hooks/useDepreciation";

export default function DepreciationHistoryTable(){

const{

records,

}=

useDepreciation();

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead>

<tr>

<th>Period</th>

<th>Method</th>

<th>Depreciation</th>

<th>Accumulated</th>

<th>Book Value</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{records.map(record=>(

<tr key={record.id}>

<td>{record.period}</td>

<td>{record.method}</td>

<td>

₦{record.depreciation.toLocaleString()}

</td>

<td>

₦{record.accumulatedDepreciation.toLocaleString()}

</td>

<td>

₦{record.bookValue.toLocaleString()}

</td>

<td>

{

record.posted

?

"Posted"

:

"Pending"

}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}