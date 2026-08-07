export type StockStatus =

  | "In Stock"

  | "Low Stock"

  | "Out of Stock";

export function getStockStatus(

  quantity: number,

): StockStatus {

  if (quantity <= 0) {

    return "Out of Stock";

  }

  if (quantity <= 10) {

    return "Low Stock";

  }

  return "In Stock";

}