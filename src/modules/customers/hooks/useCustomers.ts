import { useEffect } from "react";

import {
  useCustomerStore,
} from "../store/CustomerStore";

import {
  customerService,
} from "../services/CustomerService";

export function useCustomers() {
  const customers =
    useCustomerStore(
      (state) =>
        state.customers,
    );

  const setCustomers =
    useCustomerStore(
      (state) =>
        state.setCustomers,
    );

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data =
          await customerService.getAll();

        if (mounted) {
          setCustomers(data);
        }
      } catch (error) {
        console.error(
          "Failed to load customers:",
          error,
        );
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [setCustomers]);

  return {
    customers,
  };
}