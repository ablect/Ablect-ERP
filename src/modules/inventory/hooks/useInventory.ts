import { useInventoryStore } from "../store/InventoryStore";

export function useInventory() {
  return useInventoryStore();
}