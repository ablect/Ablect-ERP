import {

useSupplierInvoices

}

from "../hooks/useSupplierInvoices";

import {

useDeleteSupplierInvoice

}

from "../hooks/useDeleteSupplierInvoice";

import SupplierInvoiceActions

from "./SupplierInvoiceActions";

import SupplierInvoiceEmptyState

from "./SupplierInvoiceEmptyState";

export default function SupplierInvoiceTable(){

const{

invoices,

}=

useSupplierInvoices();

const{

remove,

}=

useDeleteSupplierInvoice();

if(invoices.length===0){

return<SupplierInvoiceEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Invoice</th>

<th className="p-3">Supplier</th>

<th className="p-3">Amount</th>

<th className="p-3">Paid</th>

<th className="p-3">Balance</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{invoices.map(invoice=>(

<tr

key={invoice.id}

className="border-t"

>

<td className="p-3">

{invoice.invoiceNumber}

</td>

<td className="p-3">

{invoice.supplierId}

</td>

<td className="p-3">

₦{invoice.amount.toLocaleString()}

</td>

<td className="p-3">

₦{invoice.paid.toLocaleString()}

</td>

<td className="p-3">

₦{invoice.balance.toLocaleString()}

</td>

<td className="p-3">

{invoice.status}

</td>

<td className="p-3">

<SupplierInvoiceActions

onEdit={()=>{}}

onDelete={()=>remove(invoice.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}