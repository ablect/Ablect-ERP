import { createStockAdjustment }
from "../utils/createStockAdjustment";

import { stockAdjustmentService }
from "../services/StockAdjustmentService";

import { useStockAdjustmentStore }
from "../store/StockAdjustmentStore";

import { inventoryStockService }
from "../services/InventoryStockService";

export function useAdjustStock() {

  async function increase(

    productId: string,

    quantity: number,

    reason: string,

  ) {

    inventoryStockService.increase(

      productId,

      quantity,

    );

    const adjustment =

      createStockAdjustment(

        productId,

        quantity,

        reason,

      );

    const adjustments =

      await stockAdjustmentService.create(

        adjustment,

      );

    useStockAdjustmentStore

      .getState()

      .setAdjustments(

        adjustments,

      );

  }

  async function decrease(

    productId: string,

    quantity: number,

    reason: string,

  ) {

    inventoryStockService.decrease(

      productId,

      quantity,

    );

    const adjustment =

      createStockAdjustment(

        productId,

        -quantity,

        reason,

      );

    const adjustments =

      await stockAdjustmentService.create(

        adjustment,

      );

    useStockAdjustmentStore

      .getState()

      .setAdjustments(

        adjustments,

      );

  }

  return {

    increase,

    decrease,

  };

}