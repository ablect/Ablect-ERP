import Card from "../../../components/ui/Card";

export default function ProfitForecastCard() {

  return (

    <Card>

      <h3 className="text-lg font-semibold">

        Expected Profit

      </h3>

      <div className="mt-6">

        <h2 className="text-3xl font-bold">

          ₦3,560,000

        </h2>

        <p className="mt-2 text-sm text-green-600">

          +8.4% projected growth

        </p>

      </div>

    </Card>

  );

}