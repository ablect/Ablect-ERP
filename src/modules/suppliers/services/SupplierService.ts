import type { Supplier } from "../types/Supplier";

function api() { if(!window.ablectDesktop?.erp?.suppliers) throw new Error("Desktop data bridge is unavailable."); return window.ablectDesktop.erp.suppliers; }
export const supplierService = {
  async getAll(): Promise<Supplier[]> { return (await api().list()) as Supplier[]; },
  async create(supplier: Supplier): Promise<Supplier[]> { return (await api().create(supplier)) as Supplier[]; },
};
