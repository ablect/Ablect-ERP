import Card

from "../../../components/ui/Card";

import {

useCashFlowTotals

}

from "../hooks/useCashFlowTotals";

export default function CashFlowStatistics(){

const{

cashIn,

cashOut,

netCash,

}=

useCashFlowTotals();

return(

<Card>

<div className="space-y-2">

<p>

Cash In:

₦{cashIn.toLocaleString()}

</p>

<p>

Cash Out:

₦{cashOut.toLocaleString()}

</p>

<p>

Net Cash Flow:

₦{netCash.toLocaleString()}

</p>

</div>

</Card>

);

}