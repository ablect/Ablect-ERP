import Card

from "../../../components/ui/Card";

import {

useEmployeeStatistics

}

from "../hooks/useEmployeeStatistics";

export default function EmployeeStatistics(){

const{

total,

active,

inactive,

}=

useEmployeeStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Total Employees:

{total}

</p>

<p>

Active:

{active}

</p>

<p>

Inactive:

{inactive}

</p>

</div>

</Card>

);

}