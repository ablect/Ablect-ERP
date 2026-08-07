import {
  balanceSheetService,
} from "../services/BalanceSheetService";

import {
  useBalanceSheetStore,
} from "../store/BalanceSheetStore";

import {
  useTrialBalance,
} from "./useTrialBalance";

export function useGenerateBalanceSheet() {

  const {
    rows,
  } = useTrialBalance();

  async function generate() {

    const report = rows
      .filter(
        (
          row
        ): row is typeof row & {
          accountType:
            | "Asset"
            | "Liability"
            | "Equity";
        } =>
          row.accountType === "Asset" ||
          row.accountType === "Liability" ||
          row.accountType === "Equity"
      )
      .map((row) => ({
        accountId: row.accountId,
        accountCode: row.accountCode,
        accountName: row.accountName,
        accountType: row.accountType,
        amount:
          row.accountType === "Asset"
            ? row.debit - row.credit
            : row.credit - row.debit,
      }));

    const result =
      await balanceSheetService.generate(
        report,
      );

    useBalanceSheetStore
      .getState()
      .setRows(result);

  }

  return {
    generate,
  };

}