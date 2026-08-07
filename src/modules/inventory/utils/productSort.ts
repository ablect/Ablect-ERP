import type { Product } from "../types/Product";
import type { ProductSortOption } from "../store/ProductSortStore";

export function productSort(
  products: Product[],
  sortBy: ProductSortOption,
): Product[] {

  const sorted = [...products];

  switch (sortBy) {

    case "name":

      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "sku":

      return sorted.sort((a, b) =>
        a.sku.localeCompare(b.sku)
      );

    case "price":

      return sorted.sort(
        (a, b) =>
          b.sellingPrice - a.sellingPrice
      );

    case "quantity":

      return sorted.sort(
        (a, b) =>
          b.quantity - a.quantity
      );

    default:

      return sorted;

  }

}