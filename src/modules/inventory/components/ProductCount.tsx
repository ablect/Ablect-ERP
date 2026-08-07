import { useProductStore }
from "../store/ProductStore";

export default function ProductCount() {

  const {

    products,

  } = useProductStore();

  return (

    <p className="text-sm text-slate-500">

      Total Products:

      {" "}

      {products.length}

    </p>

  );

}