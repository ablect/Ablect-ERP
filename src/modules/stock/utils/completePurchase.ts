import { purchaseStockService }
from "../services/PurchaseStockService";

import type { PurchaseItem }
from "../../purchases/types/PurchaseItem";

export function completePurchase(
  reference: string,
  items: PurchaseItem[],
) {

  items.forEach((item) => {

    purchaseStockService.receive(
      item.productId,
      reference,
      item.quantity,
      item.quantity,
    );

  });

}