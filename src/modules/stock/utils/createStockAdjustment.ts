import type { StockAdjustment }
from "../types/StockAdjustment";

export function createStockAdjustment(

  productId: string,

  quantity: number,

  reason: string,

): StockAdjustment {

  return {

    id: crypto.randomUUID(),

    productId,

    quantity,

    reason,

    createdAt: new Date(),

  };

}