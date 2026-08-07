import { useExecutiveDashboard } from "./useExecutiveDashboard";

import { buildExecutiveSummary } from "../services/ExecutiveSummaryService";

import { useBusinessHealthScore } from "./useBusinessHealthScore";

import { useProfitAndLossTotals } from "../../accounting/hooks/useProfitAndLossTotals";

export function useExecutiveSummary() {

  const dashboard = useExecutiveDashboard();

  const { score } = useBusinessHealthScore();

  const { netProfit } = useProfitAndLossTotals();

  return buildExecutiveSummary({

    totalRevenue: dashboard.totalRevenue,

    netProfit,

    cashPosition: dashboard.cashPosition,

    inventoryValue: dashboard.inventoryValue,

    customerCount: dashboard.customerCount,

    businessHealth: score,

  });

}