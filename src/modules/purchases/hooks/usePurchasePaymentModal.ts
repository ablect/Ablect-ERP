import { useState }

from "react";

export function usePurchasePaymentModal(){

const[

open,

setOpen,

]=

useState(false);

return{

open,

show(){

setOpen(true);

},

hide(){

setOpen(false);

},

};

}