import {
  vatService,
} from "../services/VatService";

import {
  useVatStore,
} from "../store/VatStore";

import {
  useSales,
} from "../../sales/hooks/useSales";

export function useGenerateVatReport() {

  const {
    sales,
  } = useSales();

  async function generate() {

    const report = sales.map((sale) => ({

      id: sale.id,

      reference: sale.invoiceNumber,

      date: sale.date,

      customerId: sale.customerId,

      transactionType: "Sale" as const,

      taxableAmount: sale.total,

      vatRate: 7.5,

      vatAmount: sale.total * 0.075,

      status: "Pending" as const,

    }));

    const result =
      await vatService.generate(
        report,
      );

    useVatStore
      .getState()
      .setTransactions(
        result,
      );

  }

  return {
    generate,
  };

}