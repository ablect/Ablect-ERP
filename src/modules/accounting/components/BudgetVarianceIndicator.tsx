import {

useBudgetStatistics

}

from "../hooks/useBudgetStatistics";

export default function BudgetVarianceIndicator(){

const{

variance,

}=

useBudgetStatistics();

return(

<p>

{

variance>=0

?

"Within Budget"

:

"Budget Exceeded"

}

</p>

);

}