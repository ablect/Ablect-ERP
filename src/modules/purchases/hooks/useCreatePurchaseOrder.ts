import {
  createPurchaseOrder,
} from "../utils/createPurchaseOrder";

import {
  purchaseOrderService,
} from "../services/PurchaseOrderService";

import {
  usePurchaseStore,
} from "../store/PurchaseStore";

export function useCreatePurchaseOrder() {
  async function create(
    poNumber: string,
    supplierId: string,
    orderDate: string,
    expectedDate: string,
    total: number,
  ) {
    const order = createPurchaseOrder(
      poNumber,
      supplierId,
      orderDate,
      expectedDate,
      total,
    );

    const orders =
      await purchaseOrderService.create(order);

    usePurchaseStore
      .getState()
      .setOrders(orders);
  }

  return {
    create,
  };
}