import {

useTrialBalanceTotals

}

from "../hooks/useTrialBalanceTotals";

export default function TrialBalanceIndicator(){

const{

debit,

credit,

balanced,

}=

useTrialBalanceTotals();

return(

<div>

<p>

Debit:

₦{debit.toLocaleString()}

</p>

<p>

Credit:

₦{credit.toLocaleString()}

</p>

<p>

{

balanced

?"Balanced"

:"Out of Balance"

}

</p>

</div>

);

}