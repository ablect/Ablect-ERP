import PendingReceiptCount

from "./PendingReceiptCount";

import ReceivedReceiptCount

from "./ReceivedReceiptCount";

import StockLedgerStatistics

from "./StockLedgerStatistics";

export default function PurchaseReceivingDashboard(){

return(

<div className="grid gap-4 md:grid-cols-3">

<PendingReceiptCount/>

<ReceivedReceiptCount/>

<StockLedgerStatistics/>

</div>

);

}