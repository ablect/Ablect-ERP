import {

useInventory

}

from "../hooks/useInventory";

export default function InventoryCount(){

const{

items,

}=

useInventory();

return(

<p>

Total Items:

{" "}

{items.length}

</p>

);

}