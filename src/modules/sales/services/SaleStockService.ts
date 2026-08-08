import {
  inventoryStockService,
} from "../../stock/services/InventoryStockService";

import {
  stockMovementService,
} from "../../stock/services/StockMovementService";

import {
  createStockMovement,
} from "../../stock/utils/createStockMovement";

export const saleStockService = {
  async issue(
    productId: string,
    reference: string,
    quantity: number,
  ) {
    const updatedInventory =
      await inventoryStockService.decrease(
        productId,
        quantity,
      );

    const product =
      updatedInventory.find(
        (item) => item.id === productId,
      );

    const balance =
      product?.quantity ?? 0;

    const movement =
      createStockMovement(
        productId,
        reference,
        "OUT",
        quantity,
        balance,
      );

    return stockMovementService.create(
      movement,
    );
  },
};