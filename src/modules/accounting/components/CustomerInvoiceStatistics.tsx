import Card

from "../../../components/ui/Card";

import {

useCustomerInvoiceStatistics

}

from "../hooks/useCustomerInvoiceStatistics";

export default function CustomerInvoiceStatistics(){

const{

total,

pending,

paid,

overdue,

totalAmount,

receivable,

}=

useCustomerInvoiceStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total Invoices: {total}</p>

<p>Pending: {pending}</p>

<p>Paid: {paid}</p>

<p>Overdue: {overdue}</p>

<p>Total Sales: ₦{totalAmount.toLocaleString()}</p>

<p>Receivables: ₦{receivable.toLocaleString()}</p>

</div>

</Card>

);

}