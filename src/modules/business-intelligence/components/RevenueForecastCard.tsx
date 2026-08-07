import Card from "../../../components/ui/Card";

const forecast = [

  ["Aug", 5200000],

  ["Sep", 5480000],

  ["Oct", 5720000],

  ["Nov", 5980000],

];

export default function RevenueForecastCard() {

  return (

    <Card>

      <h3 className="text-lg font-semibold">

        Revenue Forecast

      </h3>

      <div className="mt-5 space-y-3">

        {

          forecast.map(([month, value]) => (

            <div

              key={month}

              className="flex justify-between"

            >

              <span>{month}</span>

              <strong>

                ₦{Number(value).toLocaleString()}

              </strong>

            </div>

          ))

        }

      </div>

    </Card>

  );

}