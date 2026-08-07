import SupplierSummaryCards

from "./SupplierSummaryCards";

import SupplierTrendChart

from "./SupplierTrendChart";

export default function SupplierAnalyticsDashboard(){

return(

<div className="space-y-8">

<SupplierSummaryCards/>

<SupplierTrendChart/>

</div>

);

}