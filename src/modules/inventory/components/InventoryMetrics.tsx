import MetricCard from "./MetricCard";

import {

useInventoryMetrics

}

from "../hooks/useInventoryMetrics";

export default function InventoryMetrics() {

  const {

    totalProducts,

    totalQuantity,

    totalValue,

  } = useInventoryMetrics();

  return (

    <div className="grid gap-4 md:grid-cols-3">

      <MetricCard

        title="Products"

        value={totalProducts}

      />

      <MetricCard

        title="Stock Quantity"

        value={totalQuantity}

      />

      <MetricCard

        title="Inventory Value"

        value={`₦${totalValue.toLocaleString()}`}

      />

    </div>

  );

}