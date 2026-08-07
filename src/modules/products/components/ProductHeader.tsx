import { Plus } from "lucide-react";

export default function ProductHeader(){

return(

<div className="flex items-center justify-between mb-6">

<div>

<h1 className="text-3xl font-bold">

Inventory

</h1>

<p className="text-gray-500">

Manage all products

</p>

</div>

<button className="bg-red-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">

<Plus size={18}/>

New Product

</button>

</div>

);

}