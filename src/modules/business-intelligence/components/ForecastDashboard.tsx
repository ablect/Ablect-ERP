import ForecastWidget from "./ForecastWidget";

import BusinessHealthScoreCard from "./BusinessHealthScoreCard";

export default function ForecastDashboard() {

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <ForecastWidget />

      <BusinessHealthScoreCard />

    </div>

  );

}