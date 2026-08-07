import Card from "../../../components/ui/Card";
import BusinessHealthTrend from "./BusinessHealthTrend";
import HealthScoreGauge from "./HealthScoreGauge";

type Props = {
  score: number;
  lastUpdated?: string;
};

function getStatus(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent",
      color: "text-green-600",
    };
  }

  if (score >= 75) {
    return {
      label: "Good",
      color: "text-blue-600",
    };
  }

  if (score >= 60) {
    return {
      label: "Warning",
      color: "text-yellow-600",
    };
  }

  return {
    label: "Critical",
    color: "text-red-600",
  };
}

export default function BusinessHealthCard({
  score,
  lastUpdated,
}: Props) {

  const status = getStatus(score);

  return (

    <Card className="p-6 rounded-2xl shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            Business Health
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Overall operational performance
          </p>

        </div>

        <HealthScoreGauge
          score={score}
        />

      </div>

      <div className="mt-6">
        <BusinessHealthTrend

  previous={88}

  current={score}

/>
        <p
          className={`text-lg font-semibold ${status.color}`}
        >
          {status.label}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Last updated:
          {" "}
          {lastUpdated ?? "Today"}
        </p>

      </div>

    </Card>

  );

}