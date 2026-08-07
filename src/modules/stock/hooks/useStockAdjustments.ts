import {
  useStockAdjustmentStore
}
from "../store/StockAdjustmentStore";

export function useStockAdjustments() {

  const {

    adjustments,

  } = useStockAdjustmentStore();

  return {

    adjustments,

  };

}