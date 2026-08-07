import Card from "../../../components/ui/Card";

const products = [

  {

    name: "Golden Morn",

    sales: "₦850,000",

  },

  {

    name: "Peak Milk",

    sales: "₦720,000",

  },

  {

    name: "Indomie",

    sales: "₦690,000",

  },

  {

    name: "Coca-Cola",

    sales: "₦655,000",

  },

  {

    name: "Bournvita",

    sales: "₦610,000",

  },

];

export default function TopProductsCard() {

  return (

    <Card>

      <h3 className="text-lg font-semibold">

        Top Products

      </h3>

      <div className="mt-5 space-y-4">

        {

          products.map((product, index) => (

            <div

              key={product.name}

              className="flex justify-between"

            >

              <span>

                {index + 1}. {product.name}

              </span>

              <strong>

                {product.sales}

              </strong>

            </div>

          ))

        }

      </div>

    </Card>

  );

}