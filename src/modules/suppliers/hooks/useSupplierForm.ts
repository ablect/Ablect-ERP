import { useForm } from "react-hook-form";

import { zodResolver }

from "@hookform/resolvers/zod";

import {

supplierSchema,

type SupplierSchema,

}

from "../validation/supplierSchema";

export function useSupplierForm(){

return useForm<SupplierSchema>({

resolver:

zodResolver(supplierSchema),

defaultValues:{

name:"",

email:"",

phone:"",

address:"",

},

});

}