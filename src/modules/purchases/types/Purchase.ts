export interface Purchase {

  id: string;

  supplierId: string;

  invoiceNumber: string;

  purchaseDate: Date;

  totalAmount: number;

  status: "Draft" | "Completed";

  createdAt: Date;

  updatedAt: Date;

}