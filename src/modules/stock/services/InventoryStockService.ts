import {
  inventoryService,
} from "../../inventory/services/InventoryService";

export const inventoryStockService = {
  async increase(
    productId: string,
    quantity: number,
  ) {
    return inventoryService.receiveStock(
      productId,
      quantity,
    );
  },

  async decrease(
    productId: string,
    quantity: number,
  ) {
    return inventoryService.issueStock(
      productId,
      quantity,
    );
  },
};