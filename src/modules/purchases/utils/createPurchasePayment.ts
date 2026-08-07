import type {

PurchasePayment

}

from "../types/PurchasePayment";

export function createPurchasePayment(

purchaseId: string,

amount: number,

paymentMethod: string,

reference: string,

): PurchasePayment {

  return {

    id: crypto.randomUUID(),

    purchaseId,

    amount,

    paymentMethod,

    paymentDate: new Date(),

    reference,

  };

}