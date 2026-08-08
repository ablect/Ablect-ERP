import type { PurchaseOrder } from "../types/PurchaseOrder";

export function createPurchaseOrder(
  poNumber: string,
  supplierId: string,
  orderDate: string,
  expectedDate: string,
  total: number,
): PurchaseOrder {
  return {
    id: crypto.randomUUID(),
    poNumber,
    supplierId,
    orderDate,
    expectedDate,
    total,
    status: "Draft",
  };
}