import Card

from "../../../components/ui/Card";

import {

useGoodsReceivedNoteStatistics

}

from "../hooks/useGoodsReceivedNoteStatistics";

export default function GoodsReceivedNoteStatistics(){

const{

total,

pending,

received,

cancelled,

}=

useGoodsReceivedNoteStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total GRNs: {total}</p>

<p>Pending: {pending}</p>

<p>Received: {received}</p>

<p>Cancelled: {cancelled}</p>

</div>

</Card>

);

}