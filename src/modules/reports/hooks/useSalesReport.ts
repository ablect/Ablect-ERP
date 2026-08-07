import { useSalesStore }
from "../../sales/store/SalesStore";

export function useSalesReport() {

  const {

    sales,

  } = useSalesStore();

  const total = sales.reduce(

    (sum, sale) =>

      sum + sale.total,

    0,

  );

  return {

    total,

  };

}