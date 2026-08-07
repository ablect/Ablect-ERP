import {

useProfitAndLossTotals

}

from "../hooks/useProfitAndLossTotals";

export default function ProfitAndLossIndicator(){

const{

netProfit,

}=

useProfitAndLossTotals();

return(

<p>

{

netProfit>=0

?

"Business is Profitable"

:

"Business is Running at a Loss"

}

</p>

);

}