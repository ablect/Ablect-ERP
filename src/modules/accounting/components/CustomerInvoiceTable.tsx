import {

useCustomerInvoices

}

from "../hooks/useCustomerInvoices";

import {

useDeleteCustomerInvoice

}

from "../hooks/useDeleteCustomerInvoice";

import CustomerInvoiceActions

from "./CustomerInvoiceActions";

import CustomerInvoiceEmptyState

from "./CustomerInvoiceEmptyState";

export default function CustomerInvoiceTable(){

const{

invoices,

}=

useCustomerInvoices();

const{

remove,

}=

useDeleteCustomerInvoice();

if(invoices.length===0){

return<CustomerInvoiceEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Invoice</th>

<th className="p-3">Customer</th>

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

className="border-t">

<td className="p-3">

{invoice.invoiceNumber}

</td>

<td className="p-3">

{invoice.customerId}

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

<CustomerInvoiceActions

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