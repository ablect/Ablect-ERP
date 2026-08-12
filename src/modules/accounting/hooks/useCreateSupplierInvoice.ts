import { supplierInvoiceService } from "../services/SupplierInvoiceService";
import { useSupplierInvoiceStore } from "../store/SupplierInvoiceStore";
import type { SupplierInvoice } from "../types/SupplierInvoice";

export function useCreateSupplierInvoice() {
  async function create(invoiceNumber: string, supplierId: string, purchaseOrderId: string, invoiceDate: string, dueDate: string, amount: number) {
    const invoice: SupplierInvoice = {
      id: crypto.randomUUID(), invoiceNumber, supplierId, purchaseOrderId, invoiceDate, dueDate,
      amount, paid: 0, balance: amount, status: "Pending",
    };
    const invoices = await supplierInvoiceService.create(invoice);
    useSupplierInvoiceStore.getState().setInvoices(invoices);
  }
  return { create };
}
