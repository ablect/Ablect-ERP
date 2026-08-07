import Card

from "../../../components/ui/Card";

import {

useFinancialSummary

}

from "../hooks/useFinancialSummary";

export default function BalanceSheetCard(){

const report=

useFinancialSummary();

return(

<Card>

<h2 className="text-lg font-semibold">

Balance Sheet

</h2>

<p>

Assets:

₦

{report.totalAssets.toLocaleString()}

</p>

<p>

Liabilities:

₦

{report.totalLiabilities.toLocaleString()}

</p>

<p>

Equity:

₦

{report.equity.toLocaleString()}

</p>

</Card>

);

}