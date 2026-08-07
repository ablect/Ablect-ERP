import {

useSalesReport

}

from "./useSalesReport";

import {

usePurchaseReport

}

from "./usePurchaseReport";

export function useProfitReport() {

  const {

    total: sales,

  } = useSalesReport();

  const {

    total: purchases,

  } = usePurchaseReport();

  return {

    total:

      sales -

      purchases,

  };

}