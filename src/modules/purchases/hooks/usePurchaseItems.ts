import { useState } from "react";

import { createPurchaseItem } from "../utils/createPurchaseItem";

import type { PurchaseItem } from "../types/PurchaseItem";

export function usePurchaseItems() {

  const [items, setItems] = useState<PurchaseItem[]>([
    createPurchaseItem(),
  ]);

  function addItem() {

    setItems((previous) => [
      ...previous,
      createPurchaseItem(),
    ]);

  }

  function removeItem(index: number) {

    setItems((previous) =>
      previous.filter((_, i) => i !== index)
    );

  }

  return {

    items,

    addItem,

    removeItem,

  };

}