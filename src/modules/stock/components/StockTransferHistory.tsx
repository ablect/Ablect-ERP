import Card
from "../../../components/ui/Card";

import {
  useStockTransfers
}
from "../hooks/useStockTransfers";

export default function StockTransferHistory() {

  const {

    transfers,

  } = useStockTransfers();

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Transfer History

      </h2>

      <div className="space-y-2 mt-4">

        {transfers.map(

          transfer => (

            <div

              key={transfer.id}

              className="rounded border p-2"

            >

              <p>

                Product:

                {" "}

                {transfer.productId}

              </p>

              <p>

                Qty:

                {" "}

                {transfer.quantity}

              </p>

              <p>

                Ref:

                {" "}

                {transfer.reference}

              </p>

            </div>

          )

        )}

      </div>

    </Card>

  );

}