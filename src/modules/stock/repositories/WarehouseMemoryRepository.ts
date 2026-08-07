import type { Warehouse }
from "../types/Warehouse";

import type {
  WarehouseRepository
}
from "./WarehouseRepository";

export class WarehouseMemoryRepository
implements WarehouseRepository {

  private warehouses: Warehouse[] = [];

  async getAll() {
    return this.warehouses;
  }

  async create(
    warehouse: Warehouse
  ) {

    this.warehouses.push(
      warehouse
    );

    return this.warehouses;

  }

}