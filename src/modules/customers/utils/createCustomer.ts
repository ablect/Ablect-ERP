import type { Customer } from "../types/Customer";

export function createCustomer(
  name: string,
  email: string,
  phone: string,
  address: string,
): Customer {
  const now = new Date();

  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    address: address.trim(),
    createdAt: now,
    updatedAt: now,
  };
}