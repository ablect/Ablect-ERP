import {
  useStockTransferStore
}
from "../store/StockTransferStore";

export function useStockTransfers() {

  const {

    transfers,

  } = useStockTransferStore();

  return {

    transfers,

  };

}