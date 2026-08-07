import Card
from "../../../components/ui/Card";

import {

useStockAdjustments

}

from "../hooks/useStockAdjustments";

export default function StockAdjustmentHistory() {

  const {

    adjustments,

  } = useStockAdjustments();

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Adjustment History

      </h2>

      <div className="mt-4 space-y-2">

        {adjustments.map(

          adjustment => (

            <div

              key={adjustment.id}

              className="rounded border p-2"

            >

              <p>

                Product:

                {" "}

                {adjustment.productId}

              </p>

              <p>

                Qty:

                {" "}

                {adjustment.quantity}

              </p>

              <p>

                Reason:

                {" "}

                {adjustment.reason}

              </p>

            </div>

          )

        )}

      </div>

    </Card>

  );

}