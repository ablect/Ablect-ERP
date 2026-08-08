import type { SaleItem } from "../types/SaleItem";

export function createSaleItem(
  saleId: string,
  productId: string,
  quantity: number,
  unitPrice: number,
): SaleItem {
  if (!saleId) {
    throw new Error(
      "Sale ID is required.",
    );
  }

  if (!productId) {
    throw new Error(
      "Product ID is required.",
    );
  }

  if (quantity <= 0) {
    throw new Error(
      "Sale item quantity must be greater than zero.",
    );
  }

  if (unitPrice < 0) {
    throw new Error(
      "Sale item unit price cannot be negative.",
    );
  }

  return {
    id: crypto.randomUUID(),
    saleId,
    productId,
    quantity,
    unitPrice,
    total:
      quantity * unitPrice,
  };
}