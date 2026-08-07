import Card

from "../../../components/ui/Card";

import {

useSupplierInvoiceStatistics

}

from "../hooks/useSupplierInvoiceStatistics";

export default function SupplierInvoiceStatistics(){

const{

total,

pending,

paid,

overdue,

totalAmount,

outstanding,

}=

useSupplierInvoiceStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total Invoices: {total}</p>

<p>Pending: {pending}</p>

<p>Paid: {paid}</p>

<p>Overdue: {overdue}</p>

<p>Total Amount: ₦{totalAmount.toLocaleString()}</p>

<p>Outstanding: ₦{outstanding.toLocaleString()}</p>

</div>

</Card>

);

}