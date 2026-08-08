import SalesSummaryCard from "./SalesSummaryCard";
import { useSales } from "../hooks/useSales";

export default function SalesOverview() {
  const { sales } = useSales();

  const completedSales = sales.filter(
    (sale) => sale.status === "Completed"
  );

  const pendingSales = sales.filter(
    (sale) => sale.status === "Draft"
  );

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const todaysSales = completedSales
    .filter(
      (sale) => sale.date === today
    )
    .reduce(
      (total, sale) =>
        total + sale.total,
      0
    );

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <SalesSummaryCard
        title="Today's Sales"
        value={`₦${todaysSales.toLocaleString()}`}
      />

      <SalesSummaryCard
        title="Orders"
        value={sales.length}
      />

      <SalesSummaryCard
        title="Completed"
        value={completedSales.length}
      />

      <SalesSummaryCard
        title="Pending"
        value={pendingSales.length}
      />
    </div>
  );
}