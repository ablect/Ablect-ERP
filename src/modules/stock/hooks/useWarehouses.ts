import {

useWarehouseStore

}

from "../store/WarehouseStore";

export function useWarehouses() {

  const {

    warehouses,

  } = useWarehouseStore();

  return {

    warehouses,

  };

}