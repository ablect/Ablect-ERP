export interface PurchasePayment {

  id: string;

  purchaseId: string;

  amount: number;

  paymentMethod: string;

  paymentDate: Date;

  reference: string;

}