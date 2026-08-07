import { StockTransferMemoryRepository }
from "../repositories/StockTransferMemoryRepository";

import type { StockTransfer }
from "../types/StockTransfer";

const repository =
new StockTransferMemoryRepository();

export const stockTransferService = {

  getAll() {

    return repository.getAll();

  },

  create(
    transfer: StockTransfer
  ) {

    return repository.create(
      transfer
    );

  },

};