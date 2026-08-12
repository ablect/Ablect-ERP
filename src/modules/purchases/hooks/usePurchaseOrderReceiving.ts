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

export function usePurchaseOrderReceiving() {
  async function receive(purchaseOrderId: string) {
    const orders = await purchaseOrderService.getAll();
    const updated: PurchaseOrder[] = orders.map((order) => order.id === purchaseOrderId ? { ...order, status: "Received" } : order);
    usePurchaseStore.getState().setOrders(updated.map(toPurchase));
  }

  return { receive };
}
