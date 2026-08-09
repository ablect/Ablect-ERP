import { useSupplierInvoiceStore } from "../store/SupplierInvoiceStore";

export default function SupplierInvoiceStatistics() {
  const invoices = useSupplierInvoiceStore((state) => state.invoices);
  const outstanding = invoices.reduce((sum, invoice) => sum + invoice.balance, 0);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs text-slate-500">Invoices</p><p className="mt-1 text-xl font-bold">{invoices.length}</p></div>
      <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs text-slate-500">Outstanding</p><p className="mt-1 text-xl font-bold">₦{outstanding.toLocaleString()}</p></div>
    </div>
  );
}
