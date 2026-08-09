import { createPurchaseOrder } from "../utils/createPurchaseOrder";
import { purchaseOrderService } from "../services/PurchaseOrderService";
import { usePurchaseStore } from "../store/PurchaseStore";
import type { Purchase } from "../types/Purchase";
import type { PurchaseOrder } from "../types/PurchaseOrder";

function toPurchase(order: PurchaseOrder): Purchase {
  const now = new Date();
  return {
    id: order.id,
    supplierId: order.supplierId,
    invoiceNumber: order.poNumber,
    purchaseDate: new Date(order.orderDate),
    totalAmount: order.total,
    status: order.status === "Draft" ? "Draft" : "Completed",
    createdAt: now,
    updatedAt: now,
  };
}

export function useCreatePurchaseOrder() {
  async function create(poNumber: string, supplierId: string, orderDate: string, expectedDate: string, total: number) {
    const order = createPurchaseOrder(poNumber, supplierId, orderDate, expectedDate, total);
    const orders = await purchaseOrderService.create(order);
    usePurchaseStore.getState().setOrders(orders.map(toPurchase));
  }

  return { create };
}
