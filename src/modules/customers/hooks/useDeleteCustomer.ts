import { customerService } from "../services/CustomerService";
import { useCustomerStore } from "../store/CustomerStore";

export function useDeleteCustomer() {
  async function remove(
    id: string,
  ) {
    const customers =
      await customerService.delete(id);

    useCustomerStore
      .getState()
      .setCustomers(customers);

    return customers;
  }

  return {
    remove,
  };
}