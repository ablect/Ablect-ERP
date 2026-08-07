import Card

from "../../../components/ui/Card";

import {

usePerformanceStatistics

}

from "../hooks/usePerformanceStatistics";

export default function PerformanceStatistics(){

const{

total,

averageScore,

}=

usePerformanceStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Reviews:

{total}

</p>

<p>

Average Score:

{averageScore.toFixed(1)}

</p>

</div>

</Card>

);

}