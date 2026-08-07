import Card from "../../../components/ui/Card";

export default function ForecastSummaryCard() {

  return (

    <Card>

      <h3 className="text-lg font-semibold">

        AI Forecast Summary

      </h3>

      <ul className="mt-5 space-y-3 text-sm">

        <li>• Revenue expected to increase next month.</li>

        <li>• Expenses remain stable.</li>

        <li>• Inventory level is healthy.</li>

        <li>• Cash flow remains positive.</li>

      </ul>

    </Card>

  );

}