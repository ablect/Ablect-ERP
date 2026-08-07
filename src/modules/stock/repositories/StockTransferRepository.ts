import type { StockTransfer }
from "../types/StockTransfer";

export interface StockTransferRepository {

  getAll(): Promise<StockTransfer[]>;

  create(
    transfer: StockTransfer
  ): Promise<StockTransfer[]>;

}