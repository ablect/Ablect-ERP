import Card

from "../../../components/ui/Card";

import {

useBalanceSheetTotals

}

from "../hooks/useBalanceSheetTotals";

export default function BalanceSheetStatistics(){

const{

assets,

liabilities,

equity,

}=

useBalanceSheetTotals();

return(

<Card>

<div className="space-y-2">

<p>

Assets:

₦{assets.toLocaleString()}

</p>

<p>

Liabilities:

₦{liabilities.toLocaleString()}

</p>

<p>

Equity:

₦{equity.toLocaleString()}

</p>

</div>

</Card>

);

}