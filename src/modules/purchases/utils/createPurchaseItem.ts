import type { PurchaseItem } from "../types/PurchaseItem";

export function createPurchaseItem(): PurchaseItem {

  return {

    id: crypto.randomUUID(),

    purchaseId: "",

    productId: "",

    quantity: 1,

    unitCost: 0,

    total: 0,

  };

}