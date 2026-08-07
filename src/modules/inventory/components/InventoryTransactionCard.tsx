import Card from "../../../components/ui/Card";

import TransactionTable
from "./TransactionTable";
import TransactionSummary
from "./TransactionSummary";
export default function InventoryTransactionCard() {

  return (

    <Card>

      <h2 className="mb-5 text-xl font-semibold">

        Inventory Transactions

      </h2>
        <TransactionSummary />
      <TransactionTable />

    </Card>

  );

}