import {

useTrialBalance

}

from "../hooks/useTrialBalance";

import TrialBalanceEmptyState

from "./TrialBalanceEmptyState";

export default function TrialBalanceTable(){

const{

rows,

}=

useTrialBalance();

if(

rows.length===0

){

return<TrialBalanceEmptyState/>;

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

Type

</th>

<th className="p-3">

Debit

</th>

<th className="p-3">

Credit

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

{row.accountType}

</td>

<td className="p-3">

₦{row.debit.toLocaleString()}

</td>

<td className="p-3">

₦{row.credit.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}