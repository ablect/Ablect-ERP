import { createSale } from "../utils/createSale";
import { saleService } from "../services/SaleService";
import { useSalesStore } from "../store/SalesStore";

export function useCreateSale() {
  async function create(
    invoiceNumber: string,
    customerId: string,
    date: string,
    total: number
  ) {
    const sale = createSale(
      invoiceNumber,
      customerId,
      date,
      total
    );

    const sales =
      await saleService.create(
        sale
      );

    useSalesStore
      .getState()
      .setSales(sales);

    return sale;
  }

  return {
    create,
  };
}