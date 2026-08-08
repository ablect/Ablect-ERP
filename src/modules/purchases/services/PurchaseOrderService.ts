import type { PurchaseOrder } from "../types/PurchaseOrder";

let orders: PurchaseOrder[] = [];

export const purchaseOrderService = {
  async getAll() {
    return orders;
  },

  async create(order: PurchaseOrder) {
    orders = [
      ...orders,
      order,
    ];

    return orders;
  },

  async update(updated: PurchaseOrder) {
    orders = orders.map((order) =>
      order.id === updated.id
        ? updated
        : order
    );

    return orders;
  },

  async delete(id: string) {
    orders = orders.filter(
      (order) => order.id !== id
    );

    return orders;
  },
};