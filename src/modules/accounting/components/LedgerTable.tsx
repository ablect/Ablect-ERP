import {

useLedger

}

from "../hooks/useLedger";

export default function LedgerTable(){

const{

entries,

}=

useLedger();

if(entries.length===0){

return(

<p>

No ledger entries found.

</p>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Account

</th>

<th className="p-3">

Description

</th>

<th className="p-3">

Debit

</th>

<th className="p-3">

Credit

</th>

<th className="p-3">

Reference

</th>

</tr>

</thead>

<tbody>

{entries.map(entry=>(

<tr

key={entry.id}

className="border-t"

>

<td className="p-3">

{entry.account}

</td>

<td className="p-3">

{entry.description}

</td>

<td className="p-3">

₦{entry.debit.toLocaleString()}

</td>

<td className="p-3">

₦{entry.credit.toLocaleString()}

</td>

<td className="p-3">

{entry.reference}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}