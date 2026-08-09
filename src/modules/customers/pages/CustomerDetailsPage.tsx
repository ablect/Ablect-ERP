import CustomerDetailsCard from "../components/CustomerDetailsCard";
import type { Customer } from "../types/Customer";

const customer: Customer = {
  id: "1",
  customerCode: "CUS-0001",
  name: "Demo Customer",
  type: "individual",
  email: "customer@example.com",
  phone: "08000000000",
  address: "Apata",
  city: "Ibadan",
  state: "Oyo",
  status: "active",
  creditLimit: 0,
  outstandingBalance: 0,
  tier: "Standard",
  loyaltyPoints: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function CustomerDetailsPage() {
  return <CustomerDetailsCard customer={customer} />;
}
