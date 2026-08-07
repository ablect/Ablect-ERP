import ExecutiveHealthBanner from "./ExecutiveHealthBanner";
import ExecutiveSummaryCard from "./ExecutiveSummaryCard";
import ExecutiveForecastGrid from "./ExecutiveForecastGrid";

export default function ExecutiveOverview() {

  return (

    <div className="space-y-8">

      <ExecutiveHealthBanner />

      <ExecutiveSummaryCard />

      <ExecutiveForecastGrid />

    </div>

  );

}