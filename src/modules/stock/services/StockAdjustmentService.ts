import { StockAdjustmentMemoryRepository }
from "../repositories/StockAdjustmentMemoryRepository";

import type { StockAdjustment }
from "../types/StockAdjustment";

const repository =
new StockAdjustmentMemoryRepository();

export const stockAdjustmentService = {

  getAll() {

    return repository.getAll();

  },

  create(
    adjustment: StockAdjustment
  ) {

    return repository.create(
      adjustment
    );

  },

};