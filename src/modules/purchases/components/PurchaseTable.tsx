import { usePurchaseOrders } from "../hooks/usePurchaseOrders";
import { useDeletePurchaseOrder } from "../hooks/useDeletePurchaseOrder";
import PurchaseActions from "./PurchaseActions";
import PurchaseEmptyState from "./PurchaseEmptyState";

export default function PurchaseTable() {
  const { orders } = usePurchaseOrders();
  const { remove } = useDeletePurchaseOrder();

  if (orders.length === 0) return <PurchaseEmptyState />;

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3">Reference</th>
            <th className="p-3">Supplier</th>
            <th className="p-3">Purchase Date</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3 font-medium">{order.invoiceNumber}</td>
              <td className="p-3">{order.supplierId}</td>
              <td className="p-3">{order.purchaseDate.toLocaleDateString()}</td>
              <td className="p-3">₦{order.totalAmount.toLocaleString()}</td>
              <td className="p-3">{order.status}</td>
              <td className="p-3">
                <PurchaseActions onEdit={() => undefined} onDelete={() => remove(order.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
