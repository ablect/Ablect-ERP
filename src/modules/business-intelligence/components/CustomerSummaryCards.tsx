import Card

from "../../../components/ui/Card";

import {

useCustomerSummary

}

from "../hooks/useCustomerSummary";

export default function CustomerSummaryCards(){

const{

newCustomers,

returningCustomers,

activeCustomers,

lifetimeValue,

}=

useCustomerSummary();

return(

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

<Card>

<p>New Customers</p>

<h2>{newCustomers}</h2>

</Card>

<Card>

<p>Returning</p>

<h2>{returningCustomers}</h2>

</Card>

<Card>

<p>Active</p>

<h2>{activeCustomers}</h2>

</Card>

<Card>

<p>Lifetime Value</p>

<h2>

₦{lifetimeValue.toLocaleString()}

</h2>

</Card>

</div>

);

}