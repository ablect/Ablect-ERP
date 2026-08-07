import { useSupplierList }

from "../../suppliers/hooks/useSupplierList";

type Props={

value:string;

onChange:(value:string)=>void;

};

export default function SupplierSelect({

value,

onChange,

}:Props){

const{

suppliers,

}=

useSupplierList();

return(

<select

className="w-full rounded-lg border px-3 py-2"

value={value}

onChange={(e)=>

onChange(e.target.value)

}

>

<option value="">

Select Supplier

</option>

{suppliers.map(supplier=>(

<option

key={supplier.id}

value={supplier.id}

>

{supplier.name}

</option>

))}

</select>

);

}