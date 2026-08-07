import type { BankAccount } from "../types/BankAccount";

const accounts: BankAccount[] = [];

export const bankService = {

  async getAll(): Promise<BankAccount[]> {
    return accounts;
  },

  async create(
    account: BankAccount,
  ): Promise<BankAccount[]> {

    accounts.push(account);

    return accounts;

  },

};