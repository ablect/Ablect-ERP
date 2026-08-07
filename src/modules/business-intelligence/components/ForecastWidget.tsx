import Card from "../../../components/ui/Card";

import {

  useRevenueForecast,

} from "../hooks/useRevenueForecast";

export default function ForecastWidget() {

  const {

    forecast,

  } = useRevenueForecast();

  return (

    <Card>

      <h3 className="text-lg font-semibold">

        Forecast Revenue

      </h3>

      <div className="mt-6">

        <h2 className="text-4xl font-bold">

          ₦{forecast.toLocaleString()}

        </h2>

      </div>

    </Card>

  );

}