export interface InventoryProduct {
  id: string;
  name: string;
  brand: string;
  category: string;

  sku: string;

  quantity: number;

  minimumStock: number;

  costPrice: number;

  price: number;

  barcode: string;

  createdAt: Date;

  updatedAt: Date;
}