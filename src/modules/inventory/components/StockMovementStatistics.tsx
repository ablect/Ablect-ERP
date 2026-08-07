import Card

from "../../../components/ui/Card";

import {

useStockMovementStatistics

}

from "../hooks/useStockMovementStatistics";

export default function StockMovementStatistics(){

const{

total,

stockIn,

stockOut,

transfers,

adjustments,

}=

useStockMovementStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Total Movements:

{total}

</p>

<p>

Stock In:

{stockIn}

</p>

<p>

Stock Out:

{stockOut}

</p>

<p>

Transfers:

{transfers}

</p>

<p>

Adjustments:

{adjustments}

</p>

</div>

</Card>

);

}