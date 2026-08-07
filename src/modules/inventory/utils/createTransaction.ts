import type {

InventoryTransaction,

}

from "../types/InventoryTransaction";

export function createTransaction(

transaction:

Omit<

InventoryTransaction,

"id"

>

): InventoryTransaction {

return {

id: crypto.randomUUID(),

...transaction,

};

}