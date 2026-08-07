import CustomerDetailsCard from "../components/CustomerDetailsCard";

import type { Customer } from "../types/Customer";

const customer: Customer = {

  id: "1",

  name: "Demo Customer",

  email: "customer@example.com",

  phone: "08000000000",

  address: "Ibadan",

  createdAt: new Date(),

  updatedAt: new Date(),

};

export default function CustomerDetailsPage() {

  return (

    <CustomerDetailsCard

      customer={customer}

    />

  );

}