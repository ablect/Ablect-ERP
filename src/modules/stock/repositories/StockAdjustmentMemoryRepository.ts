import type { StockAdjustment }
from "../types/StockAdjustment";

import type {
  StockAdjustmentRepository
}
from "./StockAdjustmentRepository";

export class StockAdjustmentMemoryRepository
implements StockAdjustmentRepository {

  private adjustments:
  StockAdjustment[] = [];

  async getAll() {

    return this.adjustments;

  }

  async create(
    adjustment: StockAdjustment
  ) {

    this.adjustments.push(adjustment);

    return this.adjustments;

  }

}