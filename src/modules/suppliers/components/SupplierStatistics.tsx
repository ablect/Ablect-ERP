import Card

from "../../../components/ui/Card";

import {

useSuppliers

}

from "../hooks/useSuppliers";

export default function SupplierStatistics(){

const{

suppliers,

}=

useSuppliers();

return(

<Card>

<h2 className="text-lg font-semibold">

Suppliers

</h2>

<p>

{suppliers.length}

</p>

</Card>

);

}