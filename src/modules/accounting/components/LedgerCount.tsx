import {

useLedger

}

from "../hooks/useLedger";

export default function LedgerCount(){

const{

entries,

}=

useLedger();

return(

<p>

Total Entries:

{" "}

{entries.length}

</p>

);

}