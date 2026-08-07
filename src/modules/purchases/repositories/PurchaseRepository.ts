import type { Purchase } from "../types/Purchase";

export interface PurchaseRepository {

  getAll(): Promise<Purchase[]>;

  create(purchase: Purchase): Promise<Purchase[]>;

}