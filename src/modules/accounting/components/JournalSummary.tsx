import Card
from "../../../components/ui/Card";

import {
useJournal
}
from "../hooks/useJournal";

export default function JournalSummary(){

const{
entries,
}=useJournal();

const total=

entries.reduce(

(sum,item)=>

sum+

item.amount,

0,

);

return(

<Card>

<h2 className="text-lg font-semibold">

Journal Summary

</h2>

<p>

Entries:

{entries.length}

</p>

<p>

Total:

₦{total.toLocaleString()}

</p>

</Card>

);

}