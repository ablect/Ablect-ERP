import { useEffect } from "react";

import { bankService } from "../../banking/services/BankService";

import { useBankStore } from "../../banking/store/BankStore";export function useLoadBankAccounts() {

  const {
    setAccounts,
  } = useBankStore();

  useEffect(() => {

    async function load() {

      const accounts =
        await bankService.getAll();

      setAccounts(accounts);

    }

    load();

  }, [setAccounts]);

}