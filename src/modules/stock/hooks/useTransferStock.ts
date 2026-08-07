import { stockTransferService }
from "../services/StockTransferService";

import { useStockTransferStore }
from "../store/StockTransferStore";

import { createStockTransfer }
from "../utils/createStockTransfer";

import { inventoryStockService }
from "../services/InventoryStockService";

export function useTransferStock() {

  async function transfer(

    productId: string,

    fromWarehouseId: string,

    toWarehouseId: string,

    quantity: number,

    reference: string,

  ) {

    inventoryStockService.decrease(

      productId,

      quantity,

    );

    inventoryStockService.increase(

      productId,

      quantity,

    );

    const transfer =

      createStockTransfer(

        productId,

        fromWarehouseId,

        toWarehouseId,

        quantity,

        reference,

      );

    const transfers =

      await stockTransferService.create(

        transfer,

      );

    useStockTransferStore

      .getState()

      .setTransfers(

        transfers,

      );

  }

  return {

    transfer,

  };

}