import Card

from "../../../components/ui/Card";

import {

useBudgetStatistics

}

from "../hooks/useBudgetStatistics";

export default function BudgetStatistics(){

const{

budget,

actual,

variance,

}=

useBudgetStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Budget:

₦{budget.toLocaleString()}

</p>

<p>

Actual:

₦{actual.toLocaleString()}

</p>

<p>

Variance:

₦{variance.toLocaleString()}

</p>

</div>

</Card>

);

}