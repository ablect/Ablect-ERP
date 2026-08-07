import type { StockAdjustment }
from "../types/StockAdjustment";

export interface StockAdjustmentRepository {

  getAll(): Promise<StockAdjustment[]>;

  create(
    adjustment: StockAdjustment
  ): Promise<StockAdjustment[]>;

}