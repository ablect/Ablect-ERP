import { useSalesStore } from "../store/SalesStore";

export function useSales() {
  const sales = useSalesStore(
    (state) => state.sales
  );

  return {
    sales,
  };
}