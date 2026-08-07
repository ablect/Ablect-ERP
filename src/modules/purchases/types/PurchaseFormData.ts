import type { PurchaseItem } from "./PurchaseItem";

export interface PurchaseFormData {

  supplierId: string;

  invoiceNumber: string;

  purchaseDate: Date;

  totalAmount: number;

  items: PurchaseItem[];

}