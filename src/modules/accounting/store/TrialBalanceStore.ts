import { create } from "zustand";
import type { TrialBalanceRow } from "../types/TrialBalanceRow";

type TrialBalanceState = {
  rows: TrialBalanceRow[];
  debit: number;
  credit: number;
  balanced: boolean;
  setRows: (rows: TrialBalanceRow[]) => void;
};

export const useTrialBalanceStore = create<TrialBalanceState>((set) => ({
  rows: [],
  debit: 0,
  credit: 0,
  balanced: true,
  setRows: (rows) => {
    const debit = rows.reduce((sum, row) => sum + row.debit, 0);
    const credit = rows.reduce((sum, row) => sum + row.credit, 0);
    set({ rows, debit, credit, balanced: Math.abs(debit - credit) < 0.005 });
  },
}));
