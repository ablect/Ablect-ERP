import StatCard
from "../../../components/ui/StatCard";

import { useStockValue }
from "../hooks/useStockValue";

export default function StockValueCard() {

  const {

    total,

  } = useStockValue();

  return (

    <StatCard

      title="Inventory Value"

      value={`₦${total.toLocaleString()}`}

    />

  );

}