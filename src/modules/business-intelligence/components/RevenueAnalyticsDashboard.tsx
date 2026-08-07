import RevenueSummaryCards

from "./RevenueSummaryCards";

import RevenueTrendChart

from "./RevenueTrendChart";

export default function RevenueAnalyticsDashboard(){

return(

<div className="space-y-8">

<RevenueSummaryCards/>

<RevenueTrendChart/>

</div>

);

}