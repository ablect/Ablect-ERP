import { useProductStore } from "../store/ProductStore";

import QuickStat from "./QuickStat";

export default function ProductCountCard() {

  const {

    products,

  } = useProductStore();

  return (

    <QuickStat

      title="Products"

      value={products.length}

    />

  );

}