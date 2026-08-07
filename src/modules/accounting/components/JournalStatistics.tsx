import Card

from "../../../components/ui/Card";

import {

useJournalStatistics

}

from "../hooks/useJournalStatistics";

export default function JournalStatistics(){

const{

draft,

posted,

total,

}=

useJournalStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Total Journals:

{total}

</p>

<p>

Draft:

{draft}

</p>

<p>

Posted:

{posted}

</p>

</div>

</Card>

);

}