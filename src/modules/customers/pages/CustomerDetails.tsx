import CustomerDetailsCard from "../components/CustomerDetailsCard";
import type { Customer } from "../types/Customer";

const demoCustomer: Customer = {
  id: "1",
  name: "Demo Customer",
  email: "customer@example.com",
  phone: "08000000000",
  address: "Ibadan",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function CustomerDetailsPage() {
  return <CustomerDetailsCard customer={demoCustomer} />;
}
