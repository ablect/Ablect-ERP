import { requireDesktopApi } from "../../../lib/desktopApi";
import { saleService } from "../services/SaleService";
import { saleItemService } from "../services/SaleItemService";
import { useSalesStore } from "../store/SalesStore";
import type { Sale } from "../types/Sale";

export async function completeSale(saleId: string) {
  const sale = await saleService.getById(saleId);
  if (!sale) throw new Error("Sale not found.");
  if (sale.status === "Completed") return sale;
  if (sale.status === "Cancelled") throw new Error("Cancelled sales cannot be completed.");
  const items = await saleItemService.getBySaleId(saleId);
  if (!items.length) throw new Error("Sale cannot be completed because it has no items.");

  const result = await requireDesktopApi().erp.sales.create({
    customerId: sale.customerId || null,
    warehouseId: null,
    userId: null,
    paymentMethod: sale.paymentMethod || null,
    paidAmount: sale.amountPaid ?? 0,
    items: items.map((item) => ({ productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice, discount: 0, tax: 0 })),
  });

  const posted = result as { id: string; saleNumber: string; total: number; paidAmount: number; paymentStatus: string };
  const completedSale: Sale = {
    ...sale,
    id: String(posted.id),
    invoiceNumber: posted.saleNumber,
    total: Number(posted.total),
    amountPaid: Number(posted.paidAmount),
    balanceDue: Math.max(0, Number(posted.total) - Number(posted.paidAmount)),
    status: "Completed",
    paymentStatus: posted.paymentStatus === "PAID" ? "Paid" : posted.paymentStatus === "PARTIAL" ? "Partially Paid" : "Unpaid",
  };

  saleService.consumeDraft(saleId);
  saleItemService.deleteBySaleId(saleId);
  useSalesStore.getState().setSales(await saleService.getAll());
  return completedSale;
}
