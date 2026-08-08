import { create } from "zustand";
import type { Customer } from "../types/customer";

type CustomerStore = {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
};

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  customers: [],

  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),

  updateCustomer: (id, customer) =>
    set((state) => ({
      customers: state.customers.map((item) =>
        item.id === id
          ? {
              ...item,
              ...customer,
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),

  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((item) => item.id !== id),
    })),

  getCustomer: (id) =>
    get().customers.find((customer) => customer.id === id),
}));