import type { Sale } from "../types/Sale";

let sales: Sale[] = [];

export const saleService = {
  async getAll(): Promise<Sale[]> {
    return [...sales];
  },

  async getById(id: string): Promise<Sale | undefined> {
    return sales.find((sale) => sale.id === id);
  },

  async create(sale: Sale): Promise<Sale[]> {
    const duplicateId = sales.some((item) => item.id === sale.id);
    if (duplicateId) {
      throw new Error("A sale with this ID already exists.");
    }

    const invoiceNumber = sale.invoiceNumber.trim().toLowerCase();
    const duplicateInvoice = sales.some(
      (item) => item.invoiceNumber.trim().toLowerCase() === invoiceNumber,
    );

    if (duplicateInvoice) {
      throw new Error(`Invoice "${sale.invoiceNumber}" already exists.`);
    }

    sales = [...sales, { ...sale, invoiceNumber: sale.invoiceNumber.trim() }];
    return [...sales];
  },

  async update(updated: Sale): Promise<Sale[]> {
    const exists = sales.some((sale) => sale.id === updated.id);
    if (!exists) {
      throw new Error("Sale not found.");
    }

    sales = sales.map((sale) => (sale.id === updated.id ? updated : sale));
    return [...sales];
  },

  async delete(id: string): Promise<Sale[]> {
    const exists = sales.some((sale) => sale.id === id);
    if (!exists) {
      throw new Error("Sale not found.");
    }

    sales = sales.filter((sale) => sale.id !== id);
    return [...sales];
  },
};
