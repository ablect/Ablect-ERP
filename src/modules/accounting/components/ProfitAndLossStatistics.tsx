import Card

from "../../../components/ui/Card";

import {

useProfitAndLossTotals

}

from "../hooks/useProfitAndLossTotals";

export default function ProfitAndLossStatistics(){

const{

revenue,

expenses,

netProfit,

}=

useProfitAndLossTotals();

return(

<Card>

<div className="space-y-2">

<p>

Revenue:

₦{revenue.toLocaleString()}

</p>

<p>

Expenses:

₦{expenses.toLocaleString()}

</p>

<p>

Net Profit:

₦{netProfit.toLocaleString()}

</p>

</div>

</Card>

);

}