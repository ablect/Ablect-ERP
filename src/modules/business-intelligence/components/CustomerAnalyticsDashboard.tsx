import CustomerSummaryCards

from "./CustomerSummaryCards";

import CustomerGrowthChart

from "./CustomerGrowthChart";

export default function CustomerAnalyticsDashboard(){

return(

<div className="space-y-8">

<CustomerSummaryCards/>

<CustomerGrowthChart/>

</div>

);

}