import Card

from "../../../components/ui/Card";

import {

useLedger

}

from "../hooks/useLedger";

export default function LedgerStatistics(){

const{

entries,

}=

useLedger();

return(

<Card>

<h2 className="text-lg font-semibold">

Ledger Entries

</h2>

<p>

{entries.length}

</p>

</Card>

);

}