import { useProductSortStore } from "../store/ProductSortStore";
import type { ProductSortOption } from "../store/ProductSortStore";

export default function ProductSort() {

  const {

    sortBy,

    setSortBy,

  } = useProductSortStore();

  return (

    <select

      className="rounded-lg border px-3 py-2"

      value={sortBy}

      onChange={(e) =>

        setSortBy(

          e.target.value as ProductSortOption

        )

      }

    >

      <option value="name">
        Name
      </option>

      <option value="sku">
        SKU
      </option>

      <option value="price">
        Selling Price
      </option>

      <option value="quantity">
        Quantity
      </option>

    </select>

  );

}