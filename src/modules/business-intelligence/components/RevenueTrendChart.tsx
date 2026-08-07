import ChartCard from "../../../components/charts/ChartCard";
import ChartEmpty from "../../../components/charts/ChartEmpty";
import LineChart from "../../../components/charts/LineChart";

import {
  useRevenueTrendChart,
} from "../hooks/useRevenueTrendChart";

export default function RevenueTrendChart() {

  const {
    series,
  } = useRevenueTrendChart();

  return (

    <ChartCard
      title="Revenue Trend"
    >

      {

        series.length === 0

          ? <ChartEmpty />

          : (

            <LineChart
              series={series}
            />

          )

      }

    </ChartCard>

  );

}