type Props = {

  trend: "up" | "down" | "flat";

};

export default function TrendIndicator({

  trend,

}: Props) {

  if (trend === "up") {

    return <span className="text-green-600">▲ Rising</span>;

  }

  if (trend === "down") {

    return <span className="text-red-600">▼ Falling</span>;

  }

  return <span className="text-gray-500">■ Stable</span>;

}