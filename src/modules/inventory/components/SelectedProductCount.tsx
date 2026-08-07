import {

useSelectedProducts

}

from "../hooks/useSelectedProducts";

export default function SelectedProductCount() {

  const {

    products,

  } = useSelectedProducts();

  return (

    <p className="text-sm text-slate-500">

      Selected:

      {" "}

      {products.length}

    </p>

  );

}