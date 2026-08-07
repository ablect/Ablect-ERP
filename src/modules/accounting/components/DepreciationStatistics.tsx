import Card

from "../../../components/ui/Card";

import {

useDepreciationStatistics

}

from "../hooks/useDepreciationStatistics";

export default function DepreciationStatistics(){

const{

entries,

total,

accumulated,

}=

useDepreciationStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Entries:

{entries}

</p>

<p>

Current Depreciation:

₦{total.toLocaleString()}

</p>

<p>

Accumulated:

₦{accumulated.toLocaleString()}

</p>

</div>

</Card>

);

}