import Card

from "../../../components/ui/Card";

import {

useRetainedEarnings

}

from "../hooks/useRetainedEarnings";

export default function YearEndClosingStatistics(){

const{

retainedEarnings,

}=

useRetainedEarnings();

return(

<Card>

<div className="space-y-2">

<p>

Retained Earnings:

₦{retainedEarnings.toLocaleString()}

</p>

</div>

</Card>

);

}