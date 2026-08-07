import ExecutiveAnalyticsGrid from "./ExecutiveAnalyticsGrid";
import ExecutiveScorecardGrid from "./ExecutiveScorecardGrid";
import ExecutiveActivityTimeline from "./ExecutiveActivityTimeline";
import ExecutiveAlerts from "./ExecutiveAlerts";
import RevenueTrendChart from "./RevenueTrendChart";
import InsightsPanel from "./InsightsPanel";
import RecommendationsPanel from "./RecommendationsPanel";
import TopProductsCard from "./TopProductsCard";
import TopCustomersCard from "./TopCustomersCard";
import SystemStatusCard from "./SystemStatusCard";
import QuickActionsPanel from "./QuickActionsPanel";
import MonthlySalesLeaderboard from "./MonthlySalesLeaderboard";
import DepartmentPerformanceCard from "./DepartmentPerformanceCard";
import ExecutiveNewsFeed from "./ExecutiveNewsFeed";
import CashFlowHealthCard from "./CashFlowHealthCard";
import LowStockAlertCard from "./LowStockAlertCard";
import OutstandingInvoicesCard from "./OutstandingInvoicesCard";
export default function ExecutiveWidgets(){

  return(

    <div className="space-y-8">

      <ExecutiveAnalyticsGrid/>

      <ExecutiveScorecardGrid/>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

  <CashFlowHealthCard

    inflow={8350000}

    outflow={5120000}

  />

  <LowStockAlertCard/>

  <OutstandingInvoicesCard/>

</div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <RevenueTrendChart/>

        <ExecutiveAlerts/>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        <TopProductsCard/>

        <TopCustomersCard/>

        <SystemStatusCard/>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <MonthlySalesLeaderboard/>

        <DepartmentPerformanceCard/>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <InsightsPanel/>

        <ExecutiveActivityTimeline/>

      </div>

      <ExecutiveNewsFeed/>

      <QuickActionsPanel/>

      <RecommendationsPanel/>

    </div>

  );

}