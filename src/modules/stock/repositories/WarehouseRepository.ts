import type { Warehouse }
from "../types/Warehouse";

export interface WarehouseRepository {

  getAll(): Promise<Warehouse[]>;

  create(

    warehouse: Warehouse,

  ): Promise<Warehouse[]>;

}