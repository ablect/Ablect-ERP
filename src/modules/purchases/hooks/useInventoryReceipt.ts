import {
  inventoryService,
} from "../../inventory/services/InventoryService";

import {
  useInventoryStore,
} from "../../inventory/store/InventoryStore";

export function useInventoryReceipt() {
  async function receive(
    productId: string,
    quantity: number,
  ) {
    const updated =
      await inventoryService.receiveStock(
        productId,
        quantity,
      );

    useInventoryStore
      .getState()
      .setItems(updated);
  }

  return {
    receive,
  };
}