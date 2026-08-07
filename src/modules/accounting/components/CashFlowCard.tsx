import Card

from "../../../components/ui/Card";

import {

useCashFlow

}

from "../hooks/useCashFlow";

export default function CashFlowCard(){

const flow=

useCashFlow();

return(

<Card>

<h2 className="text-lg font-semibold">

Cash Flow

</h2>

<p>

Cash In:

₦

{flow.inflow.toLocaleString()}

</p>

<p>

Cash Out:

₦

{flow.outflow.toLocaleString()}

</p>

<p>

Net:

₦

{flow.netCashFlow.toLocaleString()}

</p>

</Card>

);

}