import { createCustomer } from "../utils/createCustomer";
import { customerService } from "../services/CustomerService";
import { useCustomerStore } from "../store/CustomerStore";

export function useCreateCustomer() {
  async function create(
    name: string,
    email: string,
    phone: string,
    address: string,
  ) {
    const customer =
      createCustomer(
        name,
        email,
        phone,
        address,
      );

    const customers =
      await customerService.create(
        customer,
      );

    useCustomerStore
      .getState()
      .setCustomers(customers);

    return customer;
  }

  return {
    create,
  };
}