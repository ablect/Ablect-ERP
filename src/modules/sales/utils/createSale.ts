import type { Sale } from "../types/Sale";

export function createSale(
  invoiceNumber: string,
  customerId: string,
  date: string,
  total: number,
): Sale {
  return {
    id: crypto.randomUUID(),
    invoiceNumber,
    customerId,
    date,
    total,
    status: "Draft",
  };
}