import {
  useWarehouseStore,
} from "../../warehouse/store/WarehouseStore";

export function useWarehouseReceipt() {
  function receive(
    warehouseId: string,
    quantity: number,
  ) {
    const {
      warehouses,
      setWarehouses,
    } = useWarehouseStore.getState();

    const updated = warehouses.map((warehouse) =>
      warehouse.id === warehouseId
        ? {
            ...warehouse,
            currentStock:
              warehouse.currentStock + quantity,
          }
        : warehouse
    );

    setWarehouses(updated);
  }

  return {
    receive,
  };
}