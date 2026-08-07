import Card from "../../../components/ui/Card";

const customers = [
  {
    name: "Dangote Stores",
    sales: 2250000,
  },
  {
    name: "Ade Supermarket",
    sales: 1830000,
  },
  {
    name: "Divine Mart",
    sales: 1610000,
  },
  {
    name: "Best Choice",
    sales: 1420000,
  },
  {
    name: "Food Arena",
    sales: 1280000,
  },
];

export default function TopCustomersCard() {

  return (

    <Card>

      <h3 className="text-lg font-semibold">

        Top Customers

      </h3>

      <div className="mt-5 space-y-4">

        {

          customers.map(customer => (

            <div
              key={customer.name}
              className="flex justify-between items-center"
            >

              <span>

                {customer.name}

              </span>

              <strong>

                ₦{customer.sales.toLocaleString()}

              </strong>

            </div>

          ))

        }

      </div>

    </Card>

  );

}