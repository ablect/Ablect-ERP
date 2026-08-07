import Card

from "../../../components/ui/Card";

import {

useLeaveBalance

}

from "../hooks/useLeaveBalance";

type Props={

employeeId:string;

};

export default function LeaveBalanceCard({

employeeId,

}:Props){

const{

annualEntitlement,

used,

remaining,

}=

useLeaveBalance(

employeeId,

);

return(

<Card>

<div className="space-y-2">

<p>

Annual Leave:

{annualEntitlement}

</p>

<p>

Used:

{used}

</p>

<p>

Remaining:

{remaining}

</p>

</div>

</Card>

);

}