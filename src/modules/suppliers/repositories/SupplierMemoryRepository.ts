import type { Supplier } from "../types/Supplier";

import type { SupplierRepository }

from "./SupplierRepository";

export class SupplierMemoryRepository

implements SupplierRepository {

  private suppliers: Supplier[] = [];

  async getAll() {

    return this.suppliers;

  }

  async create(supplier: Supplier) {

    this.suppliers.push(supplier);

    return this.suppliers;

  }

}