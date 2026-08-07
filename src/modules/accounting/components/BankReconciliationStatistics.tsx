import Card

from "../../../components/ui/Card";

import {

useReconciliationTotals

}

from "../hooks/useReconciliationTotals";

export default function BankReconciliationStatistics(){

const{

debit,

credit,

difference,

}=

useReconciliationTotals();

return(

<Card>

<div className="space-y-2">

<p>Total Debit: ₦{debit.toLocaleString()}</p>

<p>Total Credit: ₦{credit.toLocaleString()}</p>

<p>Difference: ₦{difference.toLocaleString()}</p>

</div>

</Card>

);

}