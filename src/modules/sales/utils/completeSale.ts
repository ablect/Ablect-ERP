import { saleStockService } from "../services/SaleStockService";
import { saleService } from "../services/SaleService";
import { saleItemService } from "../services/SaleItemService";
import { useSalesStore } from "../store/SalesStore";

export async function completeSale(
  saleId: string,
) {
  const sales = await saleService.getAll();

  const sale = sales.find(
    (item) => item.id === saleId,
  );

  if (!sale) {
    throw new Error("Sale not found.");
  }

  if (sale.status === "Completed") {
    return sale;
  }

  if (sale.status === "Cancelled") {
    throw new Error(
      "Cancelled sales cannot be completed.",
    );
  }

  const items =
    await saleItemService.getBySaleId(
      saleId,
    );

  if (items.length === 0) {
    throw new Error(
      "Sale cannot be completed because it has no items.",
    );
  }

  for (const item of items) {
    if (!item.productId) {
      throw new Error(
        "A sale item is missing a product.",
      );
    }

    if (item.quantity <= 0) {
      throw new Error(
        "Sale quantity must be greater than zero.",
      );
    }
  }

  for (const item of items) {
    await saleStockService.issue(
      item.productId,
      saleId,
      item.quantity,
    );
  }

  const completedSale = {
    ...sale,
    status: "Completed" as const,
  };

  await saleService.update(
    completedSale,
  );

  useSalesStore
    .getState()
    .setSales(
      await saleService.getAll(),
    );

  return completedSale;
}