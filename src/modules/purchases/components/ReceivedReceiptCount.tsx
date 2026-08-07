import {

useReceivedReceipts

}

from "../hooks/useReceivedReceipts";

export default function ReceivedReceiptCount(){

const{

received,

}=

useReceivedReceipts();

return(

<p>

Received Goods:

{" "}

{received.length}

</p>

);

}