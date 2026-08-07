import type { Product } from "../types/Product";

export function productSearch(

  products: Product[],

  keyword: string,

) {

  if (keyword.trim() === "") {

    return products;

  }

  const search =

    keyword

      .toLowerCase()

      .trim();

  return products.filter(product =>

    product.name.toLowerCase().includes(search) ||

    product.sku.toLowerCase().includes(search) ||

    product.barcode.toLowerCase().includes(search)

  );

}