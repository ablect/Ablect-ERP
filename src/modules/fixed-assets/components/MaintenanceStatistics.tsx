import Card

from "../../../components/ui/Card";

import {

useMaintenanceStatistics

}

from "../hooks/useMaintenanceStatistics";

export default function MaintenanceStatistics(){

const{

total,

scheduled,

inProgress,

completed,

totalCost,

}=

useMaintenanceStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Records:

{total}

</p>

<p>

Scheduled:

{scheduled}

</p>

<p>

In Progress:

{inProgress}

</p>

<p>

Completed:

{completed}

</p>

<p>

Maintenance Cost:

₦{totalCost.toLocaleString()}

</p>

</div>

</Card>

);

}