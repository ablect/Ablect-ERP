import {
  purchaseOrderService,
} from "../services/PurchaseOrderService";

import {
  usePurchaseStore,
} from "../store/PurchaseStore";

import type {
  PurchaseOrder,
} from "../types/PurchaseOrder";

export function usePurchaseOrderReceiving() {
  async function receive(
    purchaseOrderId: string,
  ) {
    const orders =
      await purchaseOrderService.getAll();

    const updated: PurchaseOrder[] =
      orders.map(
        (order): PurchaseOrder =>
          order.id === purchaseOrderId
            ? {
                ...order,
                status: "Received",
              }
            : order
      );

    usePurchaseStore
      .getState()
      .setOrders(updated);
  }

  return {
    receive,
  };
}