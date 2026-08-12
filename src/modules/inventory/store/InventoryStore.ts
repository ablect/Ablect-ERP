import { create } from "zustand";
import type { InventoryItem } from "../types/InventoryItem";
import type { InventoryProduct } from "../types/InventoryProduct";

type InventoryState = {
  items: InventoryItem[];
  products: InventoryProduct[];
  setItems: (items: InventoryItem[]) => void;
};

function toInventoryProduct(item: InventoryItem): InventoryProduct {
  return {
    id: item.id,
    name: item.itemName,
    brand: item.brand ?? "",
    category: item.category,
    sku: item.sku,
    quantity: item.quantity,
    minimumStock: item.reorderLevel,
    costPrice: item.unitCost,
    price: item.sellingPrice,
    barcode: item.barcode ?? "",
    createdAt: new Date(0),
    updatedAt: new Date(),
  };
}

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  products: [],
  setItems: (items) =>
    set({
      items,
      products: items.map(toInventoryProduct),
    }),
}));
