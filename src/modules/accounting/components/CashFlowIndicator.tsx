import {

useCashFlowTotals

}

from "../hooks/useCashFlowTotals";

export default function CashFlowIndicator(){

const{

netCash,

}=

useCashFlowTotals();

return(

<p>

{

netCash>=0

?

"Positive Cash Flow"

:

"Negative Cash Flow"

}

</p>

);

}