import {
  inventoryStockService,
} from "./InventoryStockService";

import {
  stockMovementService,
} from "./StockMovementService";

import {
  createStockMovement,
} from "../utils/createStockMovement";

export const purchaseStockService = {
  receive(
    productId: string,
    reference: string,
    quantity: number,
    balance: number,
  ) {
    inventoryStockService.increase(
      productId,
      quantity,
    );

    const movement =
      createStockMovement(
        productId,
        reference,
        "IN",
        quantity,
        balance,
      );

    return stockMovementService.create(
      movement,
    );
  },
};