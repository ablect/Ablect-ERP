import { useForm }

from "react-hook-form";

import {

zodResolver

}

from "@hookform/resolvers/zod";

import {

purchaseSchema,

type PurchaseSchema,

}

from "../validation/purchaseSchema";

import {

createPurchaseItem

}

from "../utils/createPurchaseItem";

export function usePurchaseForm(){

return useForm<PurchaseSchema>({

resolver:

zodResolver(

purchaseSchema

),

defaultValues:{

supplierId:"",

invoiceNumber:"",

purchaseDate:new Date(),

totalAmount:0,

items:[

createPurchaseItem(),

],

},

});

}