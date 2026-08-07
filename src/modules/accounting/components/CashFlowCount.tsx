import {

useCashFlow

}

from "../hooks/useCashFlow";

export default function CashFlowCount(){

const{

rows,

}=

useCashFlow();

return(

<p>

Transactions:

{" "}

{rows.length}

</p>

);

}