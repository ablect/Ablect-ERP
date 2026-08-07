import type {

Purchase

}

from "../types/Purchase";

import type {

PurchaseSchema

}

from "../validation/purchaseSchema";

export function createPurchase(

data: PurchaseSchema

): Purchase{

const now=

new Date();

return{

id:crypto.randomUUID(),

supplierId:

data.supplierId,

invoiceNumber:

data.invoiceNumber,

purchaseDate:

data.purchaseDate,

totalAmount:

data.totalAmount,

status:"Draft",

createdAt:now,

updatedAt:now,

};

}