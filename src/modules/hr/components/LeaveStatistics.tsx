import Card

from "../../../components/ui/Card";

import {

useLeaveStatistics

}

from "../hooks/useLeaveStatistics";

export default function LeaveStatistics(){

const{

total,

pending,

approved,

rejected,

}=

useLeaveStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Leave Requests:

{total}

</p>

<p>

Pending:

{pending}

</p>

<p>

Approved:

{approved}

</p>

<p>

Rejected:

{rejected}

</p>

</div>

</Card>

);

}