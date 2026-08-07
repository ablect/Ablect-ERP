import {

useMatchedTransactions

}

from "../hooks/useMatchedTransactions";

import {

useUnmatchedTransactions

}

from "../hooks/useUnmatchedTransactions";

export default function ReconciliationSummary(){

const matched=

useMatchedTransactions();

const unmatched=

useUnmatchedTransactions();

return(

<div className="space-y-2">

<p>

Matched:

{matched.length}

</p>

<p>

Unmatched:

{unmatched.length}

</p>

</div>

);

}