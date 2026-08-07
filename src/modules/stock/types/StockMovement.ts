export interface StockMovement {

  id: string;

  productId: string;

  reference: string;

  type: "IN" | "OUT" | "ADJUSTMENT";

  quantity: number;

  balance: number;

  createdAt: Date;

}