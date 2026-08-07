import Card from "../../../components/ui/Card";

import { useLowStockProducts }
from "../hooks/useLowStockProducts";

export default function LowStockAlert() {

  const {

    count,

  } = useLowStockProducts();

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Low Stock Alert

      </h2>

      <p className="mt-2 text-slate-500">

        {count} products require restocking.

      </p>

    </Card>

  );

}