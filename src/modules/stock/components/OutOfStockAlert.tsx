import Card from "../../../components/ui/Card";

import { useProductList }
from "../../inventory/hooks/useProductList";

export default function OutOfStockAlert() {

  const {

    products,

  } = useProductList();

  const count = products.filter(

    product => product.quantity === 0

  ).length;

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Out Of Stock

      </h2>

      <p className="mt-2 text-slate-500">

        {count} products are out of stock.

      </p>

    </Card>

  );

}