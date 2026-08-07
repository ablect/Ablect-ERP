import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSalesChart }
from "../../hooks/useSalesChart";

export default function SalesLineChart() {

  const { data } = useSalesChart();

  return (

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="label" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
        />

      </LineChart>

    </ResponsiveContainer>

  );

}