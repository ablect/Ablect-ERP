import Card

from "../../../components/ui/Card";

import {

useInterviewStatistics

}

from "../hooks/useInterviewStatistics";

export default function InterviewStatistics(){

const{

total,

pending,

passed,

failed,

}=

useInterviewStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Interviews: {total}

</p>

<p>

Pending: {pending}

</p>

<p>

Passed: {passed}

</p>

<p>

Failed: {failed}

</p>

</div>

</Card>

);

}