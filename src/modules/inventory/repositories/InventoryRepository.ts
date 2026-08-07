import type { InventoryProduct } from "../types/InventoryProduct";

export interface InventoryRepository {

  getAll(): Promise<InventoryProduct[]>;

  getById(id: string): Promise<InventoryProduct | null>;

  create(product: InventoryProduct): Promise<void>;

  update(product: InventoryProduct): Promise<void>;

  delete(id: string): Promise<void>;

}