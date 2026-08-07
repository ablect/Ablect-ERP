import { Plus } from "lucide-react";

export default function AddProductButton(){

return(

<button

className="flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-3 hover:bg-blue-700 transition"

>

<Plus size={18}/>

New Product

</button>

);

}