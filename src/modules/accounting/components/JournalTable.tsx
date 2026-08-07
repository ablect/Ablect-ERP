import {

useJournalEntries

}

from "../hooks/useJournalEntries";

import JournalEmptyState

from "./JournalEmptyState";

import JournalActions

from "./JournalActions";

export default function JournalTable(){

const{

entries,

}=

useJournalEntries();

if(

entries.length===0

){

return<JournalEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Journal

</th>

<th className="p-3">

Date

</th>

<th className="p-3">

Reference

</th>

<th className="p-3">

Status

</th>

<th className="p-3">

Actions

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

{entry.journalNumber}

</td>

<td className="p-3">

{entry.date}

</td>

<td className="p-3">

{entry.reference}

</td>

<td className="p-3">

{entry.status}

</td>

<td className="p-3">

<JournalActions

onEdit={()=>{}}

onDelete={()=>{}}

onPost={()=>{}}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}