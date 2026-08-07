import {

useInventoryReport

}

from "../hooks/useInventoryReport";

import TopReportCard

from "./TopReportCard";

export default function InventoryValueCard() {

  const {

    total,

  } = useInventoryReport();

  return (

    <TopReportCard

      title="Inventory Value"

      value={total}

    />

  );

}