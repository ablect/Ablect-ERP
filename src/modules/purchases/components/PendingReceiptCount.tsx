import {

usePendingReceipts

}

from "../hooks/usePendingReceipts";

export default function PendingReceiptCount(){

const{

pending,

}=

usePendingReceipts();

return(

<p>

Pending Receipts:

{" "}

{pending.length}

</p>

);

}