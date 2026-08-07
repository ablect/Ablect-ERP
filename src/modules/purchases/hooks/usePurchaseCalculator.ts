import { useMemo } from "react";

export function usePurchaseCalculator(
  items: any[] = []
) {
  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        (Number(item.quantity) || 0) *
        (Number(item.unitCost) || 0),
      0
    );
  }, [items]);

  return {
    subtotal,
  };
}