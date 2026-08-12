export interface ProductUnitVariant {
  id?: string;
  code: string;
  name: string;
  conversionToBase: number;
  sellingPrice: number;
  isDefault?: boolean;
}

export interface InventoryItem {
  id: string;
  sku: string;
  itemName: string;
  category: string;
  warehouse: string;
  unit: string;
  quantity: number;
  reorderLevel: number;
  unitCost: number;
  sellingPrice: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  barcode?: string;
  brand?: string;
  description?: string;
  imageUrl?: string;
  isTracked?: boolean;
  baseUnitCode?: string;
  unitVariants?: ProductUnitVariant[];
  createdAt?: string;
  updatedAt?: string;
}
