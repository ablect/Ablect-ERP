import { create } from "zustand";
import type { Customer } from "../types/Customer";

type CustomerState = {

  customers: Customer[];

  setCustomers: (customers: Customer[]) => void;

  addCustomer: (customer: Customer) => void;

};

export const useCustomerStore =
create<CustomerState>((set, get) => ({

  customers: [],

  setCustomers(customers) {

    set({ customers });

  },

  addCustomer(customer) {

    set({

      customers: [

        ...get().customers,

        customer,

      ],

    });

  },

}));