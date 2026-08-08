import type { Customer } from "../types/Customer";

import {
  CustomerMemoryRepository,
} from "../repositories/CustomerMemoryRepository";

const repository =
  new CustomerMemoryRepository();

export const customerService = {
  async getAll(): Promise<Customer[]> {
    return repository.getAll();
  },

  async getById(
    id: string,
  ): Promise<Customer | undefined> {
    return repository.getById(id);
  },

  async create(
    customer: Customer,
  ): Promise<Customer[]> {
    await repository.create(
      customer,
    );

    return repository.getAll();
  },

  async update(
    updated: Customer,
  ): Promise<Customer[]> {
    await repository.update(
      updated,
    );

    return repository.getAll();
  },

  async delete(
    id: string,
  ): Promise<Customer[]> {
    await repository.delete(id);

    return repository.getAll();
  },
};