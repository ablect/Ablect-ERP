import type { Purchase } from "../types/Purchase";

import type { PurchaseRepository }

from "./PurchaseRepository";

export class PurchaseMemoryRepository

implements PurchaseRepository {

  private purchases: Purchase[] = [];

  async getAll() {

    return this.purchases;

  }

  async create(purchase: Purchase) {

    this.purchases.push(purchase);

    return this.purchases;

  }

}