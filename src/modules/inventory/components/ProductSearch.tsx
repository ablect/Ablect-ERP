import type { Product } from "../types/Product";

export function productSearch(products: Product[], keyword: string): Product[] {
  const search = keyword.trim().toLowerCase();
  if (!search) return products;

  return products.filter((product) =>
    product.name.toLowerCase().includes(search) ||
    product.sku.toLowerCase().includes(search) ||
    product.barcode.toLowerCase().includes(search),
  );
}

export default productSearch;
