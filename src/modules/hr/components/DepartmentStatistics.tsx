import Card

from "../../../components/ui/Card";

import {

useDepartmentStatistics

}

from "../hooks/useDepartmentStatistics";

export default function DepartmentStatistics(){

const{

total,

active,

}=

useDepartmentStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Departments:

{total}

</p>

<p>

Active:

{active}

</p>

</div>

</Card>

);

}