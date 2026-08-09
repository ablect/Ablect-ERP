import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Customer } from "../types/Customer";

type CustomerState = {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, patch: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
};

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      customers: [],

      setCustomers(customers) {
        set({ customers });
      },

      addCustomer(customer) {
        set((state) => ({ customers: [...state.customers, customer] }));
      },

      updateCustomer(id, patch) {
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id
              ? { ...customer, ...patch, updatedAt: new Date().toISOString() }
              : customer,
          ),
        }));
      },

      deleteCustomer(id) {
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id),
        }));
      },

      getCustomer(id) {
        return get().customers.find((customer) => customer.id === id);
      },
    }),
    {
      name: "ablect-erp-customers",
      version: 1,
    },
  ),
);
