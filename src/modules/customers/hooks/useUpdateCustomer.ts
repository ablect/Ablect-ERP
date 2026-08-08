import type { Customer } from "../types/Customer";

import { customerService } from "../services/CustomerService";
import { useCustomerStore } from "../store/CustomerStore";

export function useUpdateCustomer() {
  async function update(
    customer: Customer,
  ) {
    const customers =
      await customerService.update(
        customer,
      );

    useCustomerStore
      .getState()
      .setCustomers(customers);

    return customer;
  }

  return {
    update,
  };
}