import type { Purchase } from "../types/Purchase";

let purchases: Purchase[] = [];

export const purchaseService = {
  async getAll() {
    return purchases;
  },

  async create(purchase: Purchase) {
    purchases = [
      ...purchases,
      purchase,
    ];

    return purchases;
  },

  async update(updated: Purchase) {
    purchases = purchases.map((purchase) =>
      purchase.id === updated.id
        ? updated
        : purchase
    );

    return purchases;
  },

  async delete(id: string) {
    purchases = purchases.filter(
      (purchase) => purchase.id !== id
    );

    return purchases;
  },
};