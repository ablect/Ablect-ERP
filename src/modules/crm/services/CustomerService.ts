import type { Customer } from "../types/customer";

export function createCustomerCode(customers: Customer[]): string {
  const nextNumber = customers.length + 1;

  return `CUS-${String(nextNumber).padStart(5, "0")}`;
}

export function validateCustomer(customer: Partial<Customer>): string[] {
  const errors: string[] = [];

  if (!customer.name?.trim()) {
    errors.push("Customer name is required.");
  }

  if (!customer.phone?.trim()) {
    errors.push("Phone number is required.");
  }

  if (!customer.type) {
    errors.push("Customer type is required.");
  }

  if (customer.creditLimit !== undefined && customer.creditLimit < 0) {
    errors.push("Credit limit cannot be negative.");
  }

  return errors;
}