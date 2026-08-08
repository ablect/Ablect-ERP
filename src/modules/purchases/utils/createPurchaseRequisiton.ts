import type { PurchaseRequisition } from "../types/PurchaseRequisition";

let requisitions: PurchaseRequisition[] = [];

export const purchaseRequisitionService = {
  async getAll() {
    return requisitions;
  },

  async create(requisition: PurchaseRequisition) {
    requisitions = [
      ...requisitions,
      requisition,
    ];

    return requisitions;
  },

  async update(updated: PurchaseRequisition) {
    requisitions = requisitions.map((item) =>
      item.id === updated.id
        ? updated
        : item
    );

    return requisitions;
  },

  async delete(id: string) {
    requisitions = requisitions.filter(
      (item) => item.id !== id
    );

    return requisitions;
  },
};

/**
 * Create a purchase requisition.
 */
export async function createPurchaseRequisition(
  requisition: PurchaseRequisition
) {
  return purchaseRequisitionService.create(requisition);
} 