import type { Customer } from "../types/Customer";
import type { CustomerRepository } from "./CustomerRepository";

export class CustomerMemoryRepository
implements CustomerRepository {

  private customers: Customer[] = [];

  async getAll() {

    return this.customers;

  }

  async create(customer: Customer) {

    this.customers.push(customer);

    return this.customers;

  }

}