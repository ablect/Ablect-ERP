import ExecutiveSummaryCard from "./ExecutiveSummaryCard";

import DashboardAlerts from "./DashboardAlerts";

import ForecastDashboard from "./ForecastDashboard";

import AIOverviewDashboard from "./AIOverviewDashboard";

import SystemHealthPanel from "./SystemHealthPanel";

export default function ExecutiveDashboardHome(){

return(

<div className="space-y-8">

<ExecutiveSummaryCard/>

<ForecastDashboard/>

<DashboardAlerts/>

<SystemHealthPanel/>

<AIOverviewDashboard/>

</div>

);

}