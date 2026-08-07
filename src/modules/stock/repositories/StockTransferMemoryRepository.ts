import type { StockTransfer }
from "../types/StockTransfer";

import type {
  StockTransferRepository
}
from "./StockTransferRepository";

export class StockTransferMemoryRepository
implements StockTransferRepository {

  private transfers: StockTransfer[] = [];

  async getAll() {

    return this.transfers;

  }

  async create(
    transfer: StockTransfer
  ) {

    this.transfers.push(
      transfer
    );

    return this.transfers;

  }

}