import Card

from "../../../components/ui/Card";

import {

useAccountingLedgerStatistics

}

from "../hooks/useAccountingLedgerStatistics";

export default function AccountingLedgerStatistics(){

const{

entries,

debit,

credit,

}=

useAccountingLedgerStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Ledger Entries:

{entries}

</p>

<p>

Debits:

₦{debit.toLocaleString()}

</p>

<p>

Credits:

₦{credit.toLocaleString()}

</p>

</div>

</Card>

);

}