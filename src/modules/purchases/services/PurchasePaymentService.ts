import type {

PurchasePayment

}

from "../types/PurchasePayment";

import {

PurchasePaymentMemoryRepository

}

from "../repositories/PurchasePaymentMemoryRepository";

const repository =

new PurchasePaymentMemoryRepository();

export const purchasePaymentService = {

  getAll() {

    return repository.getAll();

  },

  create(

    payment: PurchasePayment

  ) {

    return repository.create(payment);

  },

};