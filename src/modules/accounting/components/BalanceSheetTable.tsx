import {

useBalanceSheet

}

from "../hooks/useBalanceSheet";

import BalanceSheetEmptyState

from "./BalanceSheetEmptyState";

export default function BalanceSheetTable(){

const{

rows,

}=

useBalanceSheet();

if(

rows.length===0

){

return<BalanceSheetEmptyState/>;

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

Balance

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

₦{row.amount.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}