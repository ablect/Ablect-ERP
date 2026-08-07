import { warehouseService }
from "../services/WarehouseService";

import { useWarehouseStore }
from "../store/WarehouseStore";

import { createWarehouse }
from "../utils/createWarehouse";

export function useCreateWarehouse() {

  async function create(

    name: string,

    location: string,

  ) {

    const warehouse =

      createWarehouse(

        name,

        location,

      );

    const warehouses =

      await warehouseService.create(

        warehouse,

      );

    useWarehouseStore

      .getState()

      .setWarehouses(

        warehouses,

      );

  }

  return {

    create,

  };

}