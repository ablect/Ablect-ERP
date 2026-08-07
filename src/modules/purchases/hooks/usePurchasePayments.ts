import { usePurchasePaymentStore }
from "../store/PurchasePaymentStore";

export function usePurchasePayments() {

  const {
    payments,
  } = usePurchasePaymentStore();

  return {
    payments,
  };

}