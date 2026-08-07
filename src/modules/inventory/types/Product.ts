export interface Product {

  id: string;

  name: string;

  sku: string;

  barcode: string;

  categoryId: string;

  brandId: string;

  unitId: string;

  costPrice: number;

  sellingPrice: number;

  quantity: number;

  minimumStock: number;

  description: string;

  createdAt: Date;

  updatedAt: Date;

}