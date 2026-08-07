import {

useProfitReport

}

from "../hooks/useProfitReport";

import TopReportCard

from "./TopReportCard";

export default function ProfitCard() {

  const {

    total,

  } = useProfitReport();

  return (

    <TopReportCard

      title="Net Profit"

      value={total}

    />

  );

}