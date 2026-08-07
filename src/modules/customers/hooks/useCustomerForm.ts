import { useForm } from "react-hook-form";

import {

zodResolver

} from "@hookform/resolvers/zod";

import {

customerSchema,

type CustomerSchema,

}

from "../validation/customerSchema";

export function useCustomerForm(){

return useForm<CustomerSchema>({

resolver:

zodResolver(customerSchema),

defaultValues:{

name:"",

email:"",

phone:"",

address:"",

},

});

}