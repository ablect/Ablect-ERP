import { WarehouseMemoryRepository }
from "../repositories/WarehouseMemoryRepository";

import type { Warehouse }
from "../types/Warehouse";

const repository =
new WarehouseMemoryRepository();

export const warehouseService = {

  getAll() {

    return repository.getAll();

  },

  create(
    warehouse: Warehouse
  ) {

    return repository.create(
      warehouse
    );

  },

};