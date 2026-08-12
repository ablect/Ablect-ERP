import { inventoryStockService } from "../../stock/services/InventoryStockService";
import { saleItemService } from "../services/SaleItemService";
import { salePaymentService } from "../services/SalePaymentService";
import { saleService } from "../services/SaleService";

export async function cancelSale(
  saleId: string,
  reason = "Cancelled by user",
) {
  const sale = await saleService.getById(saleId);

  if (!sale) {
    throw new Error("Sale not found.");
  }

  if (sale.status === "Cancelled") {
    return sale;
  }

  const items = await saleItemService.getBySaleId(saleId);

  if (sale.status === "Completed") {
    for (const item of items) {
      await inventoryStockService.increase(item.productId, item.quantity);
    }
  }

  await salePaymentService.deleteBySaleId(saleId);

  const cancelledSale = {
    ...sale,
    status: "Cancelled" as const,
    cancelledAt: new Date().toISOString(),
    cancelledReason: reason,
  };

  await saleService.update(cancelledSale);
  return cancelledSale;
}
