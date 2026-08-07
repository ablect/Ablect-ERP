import PageContainer

from "../../../components/ui/PageContainer";

import BudgetHeader

from "../components/BudgetHeader";

import BudgetToolbar

from "../components/BudgetToolbar";

import BudgetDashboard

from "../components/BudgetDashboard";

export default function BudgetPage(){

return(

<PageContainer>

<div className="space-y-8">

<BudgetHeader/>

<BudgetToolbar/>

<BudgetDashboard/>

</div>

</PageContainer>

);

}