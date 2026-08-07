import {
  useExecutiveScorecard,
} from "./useExecutiveScorecard";

export function useExecutiveKPIs() {

  const scorecard =
    useExecutiveScorecard();

  return [

    {
      id: "revenue",
      title: "Revenue",
      value: `₦${scorecard.totalRevenue.toLocaleString()}`,
      route: "/analytics/revenue",
      category: "finance",
      priority: 1,
    },

    {
      id: "profit",
      title: "Net Profit",
      value: `₦${scorecard.netProfit.toLocaleString()}`,
      route: "/accounting/profit-loss",
      category: "finance",
      priority: 2,
    },

    {
      id: "inventory",
      title: "Inventory",
      value: `₦${scorecard.inventoryValue.toLocaleString()}`,
      route: "/analytics/inventory",
      category: "inventory",
      priority: 3,
    },

    {
      id: "customers",
      title: "Customers",
      value: scorecard.activeCustomers.toLocaleString(),
      route: "/analytics/customers",
      category: "crm",
      priority: 4,
    },

    {
      id: "suppliers",
      title: "Suppliers",
      value: `${scorecard.supplierRating.toFixed(1)}/5`,
      route: "/analytics/suppliers",
      category: "procurement",
      priority: 5,
    },

  ];

}