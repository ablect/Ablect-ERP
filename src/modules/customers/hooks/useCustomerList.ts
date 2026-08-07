import { useCustomerStore }

from "../store/CustomerStore";

export function useCustomerList() {

const {

customers,

}=

useCustomerStore();

return {

customers,

};

}