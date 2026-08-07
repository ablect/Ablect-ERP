import {

useInventoryTransactionStore,

}

from "../store/InventoryTransactionStore";

import StockMovementBadge
from "./StockMovementBadge";

export default function TransactionTable() {

  const {

    transactions,

  } = useInventoryTransactionStore();

  if (

    transactions.length === 0

  ) {

    return (

      <div className="rounded-xl border border-dashed p-10 text-center">

        No inventory transactions.

      </div>

    );

  }

  return (

    <div className="overflow-x-auto rounded-xl border">

      <table className="min-w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">

              Type

            </th>

            <th className="p-3 text-left">

              Quantity

            </th>

            <th className="p-3 text-left">

              Reference

            </th>

          </tr>

        </thead>

        <tbody>

          {transactions.map(

            (transaction) => (

              <tr

                key={transaction.id}

              >

                <td className="p-3">

                  <StockMovementBadge

                    type={transaction.type}

                  />

                </td>

                <td className="p-3">

                  {transaction.quantity}

                </td>

                <td className="p-3">

                  {transaction.reference}

                </td>

              </tr>

            )

          )}

        </tbody>

      </table>

    </div>

  );

}