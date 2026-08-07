import Card

from "../../../components/ui/Card";

import {

useApplicantStatistics

}

from "../hooks/useApplicantStatistics";

export default function ApplicantStatistics(){

const{

total,

applied,

interview,

hired,

}=

useApplicantStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Applicants:

{total}

</p>

<p>

Applied:

{applied}

</p>

<p>

Interview:

{interview}

</p>

<p>

Hired:

{hired}

</p>

</div>

</Card>

);

}