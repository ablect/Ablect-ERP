import { useEffect } from "react";

import {

customerService

}

from "../services/CustomerService";

import {

useCustomerStore

}

from "../store/CustomerStore";

export function useLoadCustomers(){

const{

setCustomers,

}=

useCustomerStore();

useEffect(()=>{

customerService

.getAll()

.then(setCustomers);

},[]);

}