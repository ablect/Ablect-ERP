import {

useVat

}

from "../hooks/useVat";

import VatEmptyState

from "./VatEmptyState";

export default function VatTable(){

const{

transactions,

}=

useVat();

if(

transactions.length===0

){

return<VatEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Reference

</th>

<th className="p-3">

Date

</th>

<th className="p-3">

Type

</th>

<th className="p-3">

Taxable Amount

</th>

<th className="p-3">

VAT

</th>

<th className="p-3">

Status

</th>

</tr>

</thead>

<tbody>

{transactions.map(item=>(

<tr

key={item.id}

className="border-t"

>

<td className="p-3">

{item.reference}

</td>

<td className="p-3">

{item.date}

</td>

<td className="p-3">

{item.transactionType}

</td>

<td className="p-3">

₦{item.taxableAmount.toLocaleString()}

</td>

<td className="p-3">

₦{item.vatAmount.toLocaleString()}

</td>

<td className="p-3">

{item.status}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}