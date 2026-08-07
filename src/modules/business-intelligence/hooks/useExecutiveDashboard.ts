import { useExecutiveRevenue } from "./useExecutiveRevenue";
import { useExecutiveInventoryValue } from "./useExecutiveInventoryValue";
import { useExecutiveCustomerCount } from "./useExecutiveCustomerCount";
import { useExecutiveSupplierCount } from "./useExecutiveSupplierCount";
import { useExecutiveCashPosition } from "./useExecutiveCashPosition";

export function useExecutiveDashboard() {

  const revenue = useExecutiveRevenue();

  const inventory = useExecutiveInventoryValue();

  const customers = useExecutiveCustomerCount();

  const suppliers = useExecutiveSupplierCount();

  const cash = useExecutiveCashPosition();

  return {

    ...revenue,

    ...inventory,

    ...customers,

    ...suppliers,

    ...cash,

  };

}