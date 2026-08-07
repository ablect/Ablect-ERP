import Card

from "../../../components/ui/Card";

import {

useFixedAssetStatistics

}

from "../hooks/useFixedAssetStatistics";

export default function FixedAssetStatistics(){

const{

total,

active,

maintenance,

disposed,

totalValue,

}=

useFixedAssetStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Assets:

{total}

</p>

<p>

Active:

{active}

</p>

<p>

Maintenance:

{maintenance}

</p>

<p>

Disposed:

{disposed}

</p>

<p>

Asset Value:

₦{totalValue.toLocaleString()}

</p>

</div>

</Card>

);

}