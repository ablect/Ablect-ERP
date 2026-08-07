import Card

from "../../../components/ui/Card";

import {

useStockLedgerStatistics

}

from "../hooks/useStockLedgerStatistics";

export default function StockLedgerStatistics(){

const{

total,

stockIn,

stockOut,

}=

useStockLedgerStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total Entries: {total}</p>

<p>Stock In: {stockIn}</p>

<p>Stock Out: {stockOut}</p>

</div>

</Card>

);

}