import type { Customer } from "../types/Customer";

export class CustomerMemoryRepository {
  private customers: Customer[] = [];

  async getAll(): Promise<Customer[]> {
    return [...this.customers];
  }

  async getById(
    id: string,
  ): Promise<Customer | undefined> {
    return this.customers.find(
      (customer) =>
        customer.id === id,
    );
  }

  async create(
    customer: Customer,
  ): Promise<Customer> {
    const exists =
      this.customers.some(
        (item) =>
          item.id === customer.id,
      );

    if (exists) {
      throw new Error(
        "Customer already exists.",
      );
    }

    this.customers = [
      ...this.customers,
      customer,
    ];

    return customer;
  }

  async update(
    updated: Customer,
  ): Promise<Customer> {
    const index =
      this.customers.findIndex(
        (customer) =>
          customer.id ===
          updated.id,
      );

    if (index === -1) {
      throw new Error(
        "Customer not found.",
      );
    }

    this.customers[index] =
      updated;

    return updated;
  }

  async delete(
    id: string,
  ): Promise<void> {
    const exists =
      this.customers.some(
        (customer) =>
          customer.id === id,
      );

    if (!exists) {
      throw new Error(
        "Customer not found.",
      );
    }

    this.customers =
      this.customers.filter(
        (customer) =>
          customer.id !== id,
      );
  }
}