import type { Customer } from "../types/Customer";

const STORAGE_KEY = "ablect-erp-customer-repository";

function readCustomers(): Customer[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Customer[]) : [];
  } catch {
    return [];
  }
}

function writeCustomers(customers: Customer[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

export class CustomerMemoryRepository {
  async getAll(): Promise<Customer[]> {
    return readCustomers();
  }

  async getById(id: string): Promise<Customer | undefined> {
    return readCustomers().find((customer) => customer.id === id);
  }

  async create(customer: Customer): Promise<Customer> {
    const customers = readCustomers();
    if (customers.some((item) => item.id === customer.id)) {
      throw new Error("Customer already exists.");
    }

    const next = [...customers, customer];
    writeCustomers(next);
    return customer;
  }

  async update(updated: Customer): Promise<Customer> {
    const customers = readCustomers();
    if (!customers.some((customer) => customer.id === updated.id)) {
      throw new Error("Customer not found.");
    }

    writeCustomers(customers.map((customer) => customer.id === updated.id ? updated : customer));
    return updated;
  }

  async delete(id: string): Promise<void> {
    const customers = readCustomers();
    if (!customers.some((customer) => customer.id === id)) {
      throw new Error("Customer not found.");
    }

    writeCustomers(customers.filter((customer) => customer.id !== id));
  }
}
