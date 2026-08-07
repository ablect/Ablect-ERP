import Card

from "../../../components/ui/Card";

import {

useTrainingStatistics

}

from "../hooks/useTrainingStatistics";

export default function TrainingStatistics(){

const{

total,

scheduled,

ongoing,

completed,

}=

useTrainingStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Courses:

{total}

</p>

<p>

Scheduled:

{scheduled}

</p>

<p>

Ongoing:

{ongoing}

</p>

<p>

Completed:

{completed}

</p>

</div>

</Card>

);

}