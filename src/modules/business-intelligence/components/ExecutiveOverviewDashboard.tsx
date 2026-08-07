import ExecutiveDashboardHeader from "./ExecutiveDashboardHeader";
import ExecutiveFilterBar from "./ExecutiveFilterBar";
import ExecutiveWidgets from "./ExecutiveWidgets";
import OpenRecommendationsCounter from "./OpenRecommendationsCounter";

export default function ExecutiveOverviewDashboard() {

  return (

    <div className="space-y-8">

      <ExecutiveDashboardHeader />

      <OpenRecommendationsCounter />

      <ExecutiveFilterBar />

      <ExecutiveWidgets />

    </div>

  );

}