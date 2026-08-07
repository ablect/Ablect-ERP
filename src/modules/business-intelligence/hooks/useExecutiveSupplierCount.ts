import { useSuppliers } from "../../suppliers/hooks/useSuppliers";

export function useExecutiveSupplierCount() {

  const { suppliers } = useSuppliers();

  return {

    supplierCount: suppliers.length,

  };

}