import type { Purchase } from "../types/Purchase";
import type { PurchasePayment } from "../types/PurchasePayment";

export function calculatePurchaseBalance(
  purchase: Purchase,
  payments: PurchasePayment[],
) {

  const paid = payments
    .filter(
      payment => payment.purchaseId === purchase.id
    )
    .reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

  return purchase.totalAmount - paid;

}