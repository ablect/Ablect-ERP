export type SalePaymentMethod =
  | "Cash"
  | "Card"
  | "Bank Transfer"
  | "POS"
  | "Mobile Money"
  | "Cheque"
  | "Credit";

export type SalePayment = {
  id: string;
  saleId: string;
  method: SalePaymentMethod;
  amount: number;
  reference?: string;
  createdAt: string;
};
