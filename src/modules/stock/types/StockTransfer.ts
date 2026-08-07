export interface StockTransfer {

  id: string;

  productId: string;

  fromWarehouseId: string;

  toWarehouseId: string;

  quantity: number;

  reference: string;

  createdAt: Date;

}