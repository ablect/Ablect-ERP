import Card

from "../../../components/ui/Card";

import {

useSupplierPaymentStatistics

}

from "../hooks/useSupplierPaymentStatistics";

export default function SupplierPaymentStatistics(){

const{

count,

totalPaid,

}=

useSupplierPaymentStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Payments:

{count}

</p>

<p>

Total Paid:

₦{totalPaid.toLocaleString()}

</p>

</div>

</Card>

);

}