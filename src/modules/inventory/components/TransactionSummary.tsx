import {

useInventoryTransactionStore,

}

from "../store/InventoryTransactionStore";

export default function TransactionSummary() {

const {

transactions,

}=

useInventoryTransactionStore();

return (

<p className="text-sm text-slate-500">

Transactions:

{" "}

{transactions.length}

</p>

);

}