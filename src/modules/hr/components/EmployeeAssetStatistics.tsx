import Card

from "../../../components/ui/Card";

import {

useEmployeeAssetStatistics

}

from "../hooks/useEmployeeAssetStatistics";

export default function EmployeeAssetStatistics(){

const{

total,

assigned,

returned,

lost,

}=

useEmployeeAssetStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Assets:

{total}

</p>

<p>

Assigned:

{assigned}

</p>

<p>

Returned:

{returned}

</p>

<p>

Lost:

{lost}

</p>

</div>

</Card>

);

}