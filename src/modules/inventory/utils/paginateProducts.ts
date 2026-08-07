import type { Product } from "../types/Product";

export function paginateProducts(

  products: Product[],

  page: number,

  pageSize: number,

): Product[] {

  const start =

    (page - 1) * pageSize;

  return products.slice(

    start,

    start + pageSize,

  );

}