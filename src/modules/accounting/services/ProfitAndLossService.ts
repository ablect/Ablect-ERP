import type { ProfitAndLossRow } from "../types/ProfitAndLossRow";

export const profitAndLossService = {
  async generate(rows: ProfitAndLossRow[]): Promise<ProfitAndLossRow[]> {
    return [...rows];
  },
};
