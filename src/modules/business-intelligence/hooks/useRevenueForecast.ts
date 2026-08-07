import { useSales } from "../../sales/hooks/useSales";

import { forecastSales } from "../services/SalesForecastService";

export function useRevenueForecast() {

  const { sales } = useSales();

  const values = sales.map(

    sale => sale.total,

  );

  return {

    forecast: forecastSales(values),

  };

}