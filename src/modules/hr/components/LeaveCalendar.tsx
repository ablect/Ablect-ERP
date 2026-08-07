import Card

from "../../../components/ui/Card";

import {

useLeaves

}

from "../hooks/useLeaves";

export default function LeaveCalendar(){

const{

leaves,

}=

useLeaves();

return(

<Card>

<div className="space-y-2">

{leaves.map(leave=>(

<div

key={leave.id}

className="border-b pb-2"

>

<p>

{leave.employeeId}

</p>

<p>

{leave.startDate}

{" - "}

{leave.endDate}

</p>

</div>

))}

</div>

</Card>

);

}