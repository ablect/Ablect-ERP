import InventoryStatCard from "./InventoryStatCard";

export default function InventoryStats(){

return(

<div className="grid grid-cols-4 gap-5">

<InventoryStatCard

title="Products"

value="1,254"

/>

<InventoryStatCard

title="Low Stock"

value="18"

/>

<InventoryStatCard

title="Inventory Value"

value="₦58.4M"

/>

<InventoryStatCard

title="Suppliers"

value="64"

/>

</div>

);

}