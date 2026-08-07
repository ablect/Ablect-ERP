import Card

from "../../../components/ui/Card";

import {

useFinancialSummary

}

from "../hooks/useFinancialSummary";

export default function ProfitAndLossCard(){

const{

grossProfit,

netProfit,

}=

useFinancialSummary();

return(

<Card>

<h2 className="text-lg font-semibold">

Profit & Loss

</h2>

<p>

Gross Profit:

₦

{grossProfit.toLocaleString()}

</p>

<p>

Net Profit:

₦

{netProfit.toLocaleString()}

</p>

</Card>

);

}