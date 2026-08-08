import type { SalePayment } from "../types/SalePayment";

let payments: SalePayment[] = [];

export const salePaymentService = {
  async getAll() {
    return [...payments];
  },

  async getBySaleId(saleId: string) {
    return payments.filter((payment) => payment.saleId === saleId);
  },

  async createMany(salePayments: SalePayment[]) {
    payments = [...payments, ...salePayments];
    return [...salePayments];
  },

  async deleteBySaleId(saleId: string) {
    payments = payments.filter((payment) => payment.saleId !== saleId);
  },
};
