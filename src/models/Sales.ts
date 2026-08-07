export interface Sale {
  id?: number;
  invoice: string;
  customer: string;
  total: number;
  paid: number;
  balance: number;
  createdAt: string;
}