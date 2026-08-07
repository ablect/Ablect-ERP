import { useProductStore } from "../store/ProductStore";

import { calculateInventoryMetrics }
from "../utils/calculateInventoryMetrics";

export function useInventoryMetrics() {

  const {

    products,

  } = useProductStore();

  return calculateInventoryMetrics(products);

}