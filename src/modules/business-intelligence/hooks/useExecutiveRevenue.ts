import { useSales } from "../../sales/hooks/useSales";

export function useExecutiveRevenue() {

  const { sales } = useSales();

  const totalRevenue = sales.reduce(

    (sum, sale) => sum + sale.total,

    0,

  );

  return {

    totalRevenue,

  };

}