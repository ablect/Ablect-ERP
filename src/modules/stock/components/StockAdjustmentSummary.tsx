import StatCard
from "../../../components/ui/StatCard";

import {

useStockAdjustments

}

from "../hooks/useStockAdjustments";

export default function StockAdjustmentSummary() {

  const {

    adjustments,

  } = useStockAdjustments();

  return (

    <StatCard

      title="Adjustments"

      value={adjustments.length}

    />

  );

}