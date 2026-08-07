import { create } from "zustand";

import type { BankAccount } from "../types/BankAccount";

type BankState = {
  accounts: BankAccount[];
  setAccounts: (accounts: BankAccount[]) => void;
};

export const useBankStore = create<BankState>((set) => ({
  accounts: [],
  setAccounts: (accounts) =>
    set({
      accounts,
    }),
}));