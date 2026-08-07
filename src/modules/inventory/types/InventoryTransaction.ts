export interface InventoryTransaction {

  id: string;

  productId: string;

  type:

    | "Stock In"

    | "Stock Out"

    | "Adjustment";

  quantity: number;

  reference: string;

  note: string;

  createdAt: Date;

}