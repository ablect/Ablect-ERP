import type { Customer } from "../types/Customer";

function api() {
  if (!window.ablectDesktop?.erp?.customers) throw new Error("Desktop data bridge is unavailable.");
  return window.ablectDesktop.erp.customers;
}

export const customerService = {
  async getAll(): Promise<Customer[]> { return (await api().list()) as Customer[]; },
  async getById(id: string): Promise<Customer | undefined> { return (await api().list(id) as Customer[]).find((customer) => customer.id === id); },
  async create(customer: Customer): Promise<Customer[]> { return (await api().create(customer)) as Customer[]; },
  async update(customer: Customer): Promise<Customer[]> { return (await api().update(customer)) as Customer[]; },
  async delete(id: string): Promise<Customer[]> { return (await api().delete(id)) as Customer[]; },
};
