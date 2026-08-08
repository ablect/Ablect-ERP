import { usePurchaseStore } from "../store/PurchaseStore";

export function usePurchaseList() {
  const { orders } = usePurchaseStore();

  return {
    purchases: orders,
  };
}