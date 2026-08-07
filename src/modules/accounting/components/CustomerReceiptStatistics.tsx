import Card

from "../../../components/ui/Card";

import {

useCustomerReceipts

}

from "../hooks/useCustomerReceipts";

export default function CustomerReceiptStatistics(){

const{

receipts,

}=

useCustomerReceipts();

const total=

receipts.reduce(

(sum,item)=>

sum+item.amount,

0,

);

return(

<Card>

<div className="space-y-2">

<p>

Receipts:

{receipts.length}

</p>

<p>

Total Received:

₦{total.toLocaleString()}

</p>

</div>

</Card>

);

}