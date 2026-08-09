import { useExecutiveScorecard } from "./useExecutiveScorecard";
import type { KPI } from "../types/KPI";

export function useExecutiveKPIs(): KPI[] {
  const scorecard = useExecutiveScorecard();

  return [
    {
      id: "revenue",
      title: "Revenue",
      value: scorecard.totalRevenue,
      previousValue: 0,
      change: 0,
      trend: "flat",
      format: "currency",
    },
    {
      id: "profit",
      title: "Net Profit",
      value: scorecard.netProfit,
      previousValue: 0,
      change: 0,
      trend: "flat",
      format: "currency",
    },
    {
      id: "inventory",
      title: "Inventory",
      value: scorecard.inventoryValue,
      previousValue: 0,
      change: 0,
      trend: "flat",
      format: "currency",
    },
    {
      id: "customers",
      title: "Customers",
      value: scorecard.activeCustomers,
      previousValue: 0,
      change: 0,
      trend: "flat",
      format: "number",
    },
    {
      id: "suppliers",
      title: "Supplier Rating",
      value: scorecard.supplierRating,
      previousValue: 0,
      change: 0,
      trend: "flat",
      format: "number",
    },
  ];
}
