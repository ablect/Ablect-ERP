import { useEffect } from "react";

import { supplierService } from "../services/SupplierService";

import { useSupplierStore } from "../store/SupplierStore";

export function useLoadSuppliers() {

  const { setSuppliers } = useSupplierStore();

  useEffect(() => {

    async function load() {

      const suppliers =
        await supplierService.getAll();

      setSuppliers(suppliers);

    }

    load();

  }, [setSuppliers]);

}