export interface Product {
  id?: number;
  barcode: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  minimumStock: number;
}