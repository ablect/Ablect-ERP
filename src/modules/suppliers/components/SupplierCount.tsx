import {

useSuppliers

}

from "../hooks/useSuppliers";

export default function SupplierCount(){

const{

suppliers,

}=

useSuppliers();

return(

<p>

Total Suppliers:

{" "}

{suppliers.length}

</p>

);

}