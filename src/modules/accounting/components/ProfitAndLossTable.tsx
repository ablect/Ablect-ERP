import {

useProfitAndLoss

}

from "../hooks/useProfitAndLoss";

import ProfitAndLossEmptyState

from "./ProfitAndLossEmptyState";

export default function ProfitAndLossTable(){

const{

rows,

}=

useProfitAndLoss();

if(

rows.length===0

){

return<ProfitAndLossEmptyState/>;

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

Amount

</th>

</tr>

</thead>

<tbody>

{rows.map(row=>(

<tr

key={row.accountId}

className="border-t"

>

<td className="p-3">

{row.accountCode}

</td>

<td className="p-3">

{row.accountName}

</td>

<td className="p-3">

{row.type}

</td>

<td className="p-3">

₦{row.amount.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}