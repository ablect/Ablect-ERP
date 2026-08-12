import type { Customer } from "../types/Customer";

export function createCustomer(
  name: string,
  email: string,
  phone: string,
  address: string,
): Customer {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    customerCode: `CUS-${Date.now().toString().slice(-6)}`,
    name: name.trim(),
    type: "individual",
    email: email.trim(),
    phone: phone.trim(),
    address: address.trim(),
    city: "",
    state: "",
    status: "active",
    creditLimit: 0,
    outstandingBalance: 0,
    tier: "Standard",
    loyaltyPoints: 0,
    createdAt: now,
    updatedAt: now,
  };
}
