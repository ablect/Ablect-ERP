import Card from "../../../components/ui/Card";

const forecast = [

  ["Aug", 2100000],

  ["Sep", 2250000],

  ["Oct", 2310000],

  ["Nov", 2400000],

];

export default function ExpenseForecastCard() {

  return (

    <Card>

      <h3 className="text-lg font-semibold">

        Expense Forecast

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