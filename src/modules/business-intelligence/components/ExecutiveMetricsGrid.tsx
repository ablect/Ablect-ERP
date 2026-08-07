import KPITrendCard from "./KPITrendCard";

import {

useExecutiveKPIMetrics

}

from "../hooks/useExecutiveKPIMetrics";

export default function ExecutiveMetricsGrid(){

const metrics=

useExecutiveKPIMetrics();

return(

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

<KPITrendCard

title="Revenue"

value={`₦${metrics.revenue.toLocaleString()}`}

change={12.4}

/>

<KPITrendCard

title="Inventory"

value={`₦${metrics.inventory.toLocaleString()}`}

change={4.2}

/>

<KPITrendCard

title="Customers"

value={metrics.customers.toString()}

change={8.1}

/>

<KPITrendCard

title="Suppliers"

value={metrics.suppliers.toString()}

change={2.3}

/>

<KPITrendCard

title="Cash"

value={`₦${metrics.cash.toLocaleString()}`}

change={6.8}

/>

</div>

);

}