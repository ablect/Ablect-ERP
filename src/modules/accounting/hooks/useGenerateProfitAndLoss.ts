import { profitAndLossService } from "../services/ProfitAndLossService";
import { useProfitAndLossStore } from "../store/ProfitAndLossStore";
import { useTrialBalance } from "./useTrialBalance";

export function useGenerateProfitAndLoss() {
  const { rows } = useTrialBalance();

  async function generate() {
    const report = rows.flatMap((row) => {
      if (row.accountType !== "Revenue" && row.accountType !== "Expense") return [];

      return [{
        accountId: row.accountId,
        accountCode: row.accountCode,
        accountName: row.accountName,
        type: row.accountType,
        amount: row.accountType === "Revenue" ? row.credit - row.debit : row.debit - row.credit,
      }];
    });

    const result = await profitAndLossService.generate(report);
    useProfitAndLossStore.getState().setRows(result);
  }

  return { generate };
}
