import Card

from "../../../components/ui/Card";

import {

useRevenueSummary

}

from "../hooks/useRevenueSummary";

export default function RevenueSummaryCards(){

const{

revenue,

cost,

profit,

}=

useRevenueSummary();

return(

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<Card>

<p>Total Revenue</p>

<h2>

₦{revenue.toLocaleString()}

</h2>

</Card>

<Card>

<p>Total Cost</p>

<h2>

₦{cost.toLocaleString()}

</h2>

</Card>

<Card>

<p>Gross Profit</p>

<h2>

₦{profit.toLocaleString()}

</h2>

</Card>

</div>

);

}