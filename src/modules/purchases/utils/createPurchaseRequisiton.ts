import type { PurchaseRequisition } from "../types/PurchaseRequisition";

/** Build a purchase requisition; persistence is handled by PurchaseRequisitionService. */
export function createPurchaseRequisition(
  requisitionNumber: string,
  department: string,
  requestedBy: string,
  requestDate: string,
  requiredDate: string,
  purpose: string,
  total: number,
): PurchaseRequisition {
  return {
    id: crypto.randomUUID(),
    requisitionNumber,
    department,
    requestedBy,
    requestDate,
    requiredDate,
    purpose,
    total,
    status: "Draft",
  };
}
