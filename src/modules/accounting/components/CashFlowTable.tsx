import {

useCashFlow

}

from "../hooks/useCashFlow";

import CashFlowEmptyState

from "./CashFlowEmptyState";

export default function CashFlowTable(){

const{

rows,

}=

useCashFlow();

if(

rows.length===0

){

return<CashFlowEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Code

</th>

<th className="p-3">

Account

</th>

<th className="p-3">

Category

</th>

<th className="p-3">

Cash In

</th>

<th className="p-3">

Cash Out

</th>

<th className="p-3">

Net Cash

</th>

</tr>

</thead>

<tbody>

{rows.map(row=>(

<tr

key={row.id}

className="border-t"

>

<td className="p-3">

{row.accountCode}

</td>

<td className="p-3">

{row.accountName}

</td>

<td className="p-3">

{row.category}

</td>

<td className="p-3">

₦{row.cashIn.toLocaleString()}

</td>

<td className="p-3">

₦{row.cashOut.toLocaleString()}

</td>

<td className="p-3">

₦{row.netCash.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}