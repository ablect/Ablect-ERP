import Card

from "../../../components/ui/Card";

import {

useOnboardingStatistics

}

from "../hooks/useOnboardingStatistics";

export default function OnboardingStatistics(){

const{

total,

completed,

pending,

progress,

}=

useOnboardingStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Employees:

{total}

</p>

<p>

Pending:

{pending}

</p>

<p>

In Progress:

{progress}

</p>

<p>

Completed:

{completed}

</p>

</div>

</Card>

);

}