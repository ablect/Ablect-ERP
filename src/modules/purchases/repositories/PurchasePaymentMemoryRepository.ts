import type {

PurchasePayment

}

from "../types/PurchasePayment";

import type {

PurchasePaymentRepository

}

from "./PurchasePaymentRepository";

export class PurchasePaymentMemoryRepository

implements PurchasePaymentRepository {

  private payments:

  PurchasePayment[] = [];

  async getAll() {

    return this.payments;

  }

  async create(

    payment: PurchasePayment

  ) {

    this.payments.push(payment);

    return this.payments;

  }

}