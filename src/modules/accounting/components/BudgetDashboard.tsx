import BudgetOverview

from "./BudgetOverview";

import BudgetVarianceIndicator

from "./BudgetVarianceIndicator";

import BudgetTable

from "./BudgetTable";

export default function BudgetDashboard(){

return(

<div className="space-y-6">

<BudgetOverview/>

<BudgetVarianceIndicator/>

<BudgetTable/>

</div>

);

}