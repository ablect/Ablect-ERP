import Card from "../../../components/ui/Card";

import {

useExecutiveSummary,

} from "../hooks/useExecutiveSummary";

export default function ExecutiveSummaryCard(){

const summary=

useExecutiveSummary();

return(

<Card>

<h2 className="text-xl font-bold">

Executive Summary

</h2>

<div className="mt-6 space-y-2">

<p>

Revenue: ₦{summary.totalRevenue.toLocaleString()}

</p>

<p>

Profit: ₦{summary.netProfit.toLocaleString()}

</p>

<p>

Cash: ₦{summary.cashPosition.toLocaleString()}

</p>

<p>

Inventory: ₦{summary.inventoryValue.toLocaleString()}

</p>

<p>

Customers: {summary.customerCount}

</p>

<p>

Business Health: {summary.businessHealth}%

</p>

</div>

</Card>

);

}