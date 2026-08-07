import type {

PurchasePayment

}

from "../types/PurchasePayment";

export interface PurchasePaymentRepository {

  getAll(): Promise<PurchasePayment[]>;

  create(

    payment: PurchasePayment

  ): Promise<PurchasePayment[]>;

}