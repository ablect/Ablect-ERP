import type { Customer } from "../types/Customer";

export interface CustomerRepository {

  getAll(): Promise<Customer[]>;

  create(customer: Customer): Promise<Customer[]>;

}