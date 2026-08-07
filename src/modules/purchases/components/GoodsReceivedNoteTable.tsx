import {

useGoodsReceivedNotes

}

from "../hooks/useGoodsReceivedNotes";

import {

useDeleteGoodsReceivedNote

}

from "../hooks/useDeleteGoodsReceivedNote";

import GoodsReceivedNoteActions

from "./GoodsReceivedNoteActions";

import GoodsReceivedNoteEmptyState

from "./GoodsReceivedNoteEmptyState";

export default function GoodsReceivedNoteTable(){

const{

notes,

}=

useGoodsReceivedNotes();

const{

remove,

}=

useDeleteGoodsReceivedNote();

if(notes.length===0){

return<GoodsReceivedNoteEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">GRN</th>

<th className="p-3">PO</th>

<th className="p-3">Supplier</th>

<th className="p-3">Warehouse</th>

<th className="p-3">Received By</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{notes.map(note=>(

<tr

key={note.id}

className="border-t"

>

<td className="p-3">

{note.grnNumber}

</td>

<td className="p-3">

{note.purchaseOrderId}

</td>

<td className="p-3">

{note.supplierId}

</td>

<td className="p-3">

{note.warehouseId}

</td>

<td className="p-3">

{note.receivedBy}

</td>

<td className="p-3">

{note.status}

</td>

<td className="p-3">

<GoodsReceivedNoteActions

onEdit={()=>{}}

onDelete={()=>remove(note.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}