import {

useWarehouses

}

from "../hooks/useWarehouses";

export default function WarehouseCount(){

const{

warehouses,

}=

useWarehouses();

return(

<p>

Total Warehouses:

{" "}

{warehouses.length}

</p>

);

}