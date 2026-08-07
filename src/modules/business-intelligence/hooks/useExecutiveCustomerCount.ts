import { useCustomerStore } from "../../customers/store/CustomerStore";

export function useExecutiveCustomerCount() {

  const customers = useCustomerStore(

    state => state.customers,

  );

  return {

    customerCount: customers.length,

  };

}