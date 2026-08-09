import type { Supplier } from "../types/Supplier";

function api() {
  if (!window.ablectDesktop?.erp?.suppliers) throw new Error("Desktop data bridge is unavailable.");
  return window.ablectDesktop.erp.suppliers;
}

export const supplierService = {
  async getAll(): Promise<Supplier[]> {
    const rows = await api().list();
    return rows as Supplier[];
  },
  async create(supplier: Supplier): Promise<Supplier[]> {
    // Supplier creation is intentionally kept behind the same bridge. The
    // backend create endpoint will be added with the procurement write flow.
    throw new Error("Supplier creation is not yet enabled in the MySQL repository.");
  },
};
