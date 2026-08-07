import { useEffect }

from "react";

import {

createReportMetric

}

from "../utils/createReportMetric";

import {

useReportStore

}

from "../store/ReportStore";

import {

useSalesReport

}

from "./useSalesReport";

import {

usePurchaseReport

}

from "./usePurchaseReport";

import {

useInventoryReport

}

from "./useInventoryReport";

import {

useProfitReport

}

from "./useProfitReport";

export function useLoadReports() {

  const {

    total: sales,

  } = useSalesReport();

  const {

    total: purchases,

  } = usePurchaseReport();

  const {

    total: inventory,

  } = useInventoryReport();

  const {

    total: profit,

  } = useProfitReport();

  useEffect(() => {

    useReportStore

      .getState()

      .setMetrics([

        createReportMetric(

          "Sales",

          sales,

        ),

        createReportMetric(

          "Purchases",

          purchases,

        ),

        createReportMetric(

          "Inventory",

          inventory,

        ),

        createReportMetric(

          "Profit",

          profit,

        ),

      ]);

  }, [

    sales,

    purchases,

    inventory,

    profit,

  ]);

}