import Card

from "../../../components/ui/Card";

import {

useFinancialSummary

}

from "../hooks/useFinancialSummary";

export default function FinancialSummaryCard(){

const report=

useFinancialSummary();

return(

<Card>

<h2 className="text-lg font-semibold">

Financial Summary

</h2>

<div className="space-y-2">

<p>

Revenue:

₦

{report.totalRevenue.toLocaleString()}

</p>

<p>

Expenses:

₦

{report.totalExpenses.toLocaleString()}

</p>

<p>

Net Profit:

₦

{report.netProfit.toLocaleString()}

</p>

</div>

</Card>

);

}