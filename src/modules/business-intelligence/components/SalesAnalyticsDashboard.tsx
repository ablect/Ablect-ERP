import SalesSummaryCards

from "./SalesSummaryCards";

import SalesTrendChart

from "./SalesTrendChart";

export default function SalesAnalyticsDashboard(){

return(

<div className="space-y-8">

<SalesSummaryCards/>

<SalesTrendChart/>

</div>

);

}