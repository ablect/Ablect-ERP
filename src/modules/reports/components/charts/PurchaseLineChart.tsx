import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  usePurchaseChart
}
from "../../hooks/usePurchaseChart";

export default function PurchaseLineChart() {

  const { data } =
  usePurchaseChart();

  return (

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="label"/>

        <YAxis/>

        <Tooltip/>

        <Line
          dataKey="value"
          type="monotone"
        />

      </LineChart>

    </ResponsiveContainer>

  );

}