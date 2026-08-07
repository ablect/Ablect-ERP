import {

useVat

}

from "../hooks/useVat";

export default function VatCount(){

const{

transactions,

}=

useVat();

return(

<p>

Transactions:

{" "}

{transactions.length}

</p>

);

}