import { usePurchaseOrders } from "./usePurchaseOrders";

export function usePurchaseStatistics() {
  const { orders } = usePurchaseOrders();

  const draft = orders.filter((order) => order.status === "Draft").length;
  const completed = orders.filter((order) => order.status === "Completed").length;
  const totalValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return {
    total: orders.length,
    draft,
    completed,
    pending: 0,
    approved: 0,
    received: completed,
    totalValue,
  };
}
