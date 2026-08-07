import { useEffect } from "react";

import { bankService } from "../services/BankService";

import { useBankStore } from "../store/BankStore";

export function useLoadBankAccounts() {

  const { setAccounts } = useBankStore();

  useEffect(() => {

    async function load() {

      const data = await bankService.getAll();

      setAccounts(data);

    }

    load();

  }, [setAccounts]);

}