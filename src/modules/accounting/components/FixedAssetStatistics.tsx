import Card

from "../../../components/ui/Card";

import {

useAssetStatistics

}

from "../hooks/useAssetStatistics";

export default function FixedAssetStatistics(){

const{

totalAssets,

totalCost,

totalBookValue,

}=

useAssetStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total Assets: {totalAssets}</p>

<p>Total Cost: ₦{totalCost.toLocaleString()}</p>

<p>Book Value: ₦{totalBookValue.toLocaleString()}</p>

</div>

</Card>

);

}