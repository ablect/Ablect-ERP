import Card

from "../../../components/ui/Card";

import {

useLedger

}

from "../hooks/useLedger";

export default function LedgerSummary(){

const{

entries,

}=

useLedger();

const debit=

entries.reduce(

(sum,item)=>

sum+

item.debit,

0,

);

const credit=

entries.reduce(

(sum,item)=>

sum+

item.credit,

0,

);

return(

<Card>

<h2 className="text-lg font-semibold">

Ledger Summary

</h2>

<p>

Debit:

₦{debit.toLocaleString()}

</p>

<p>

Credit:

₦{credit.toLocaleString()}

</p>

</Card>

);

}