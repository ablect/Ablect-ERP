import type { StockTransfer }
from "../types/StockTransfer";

export function createStockTransfer(

productId: string,

fromWarehouseId: string,

toWarehouseId: string,

quantity: number,

reference: string,

): StockTransfer {

  return {

    id: crypto.randomUUID(),

    productId,

    fromWarehouseId,

    toWarehouseId,

    quantity,

    reference,

    createdAt: new Date(),

  };

}