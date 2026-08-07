import { useProductList }

from "../../inventory/hooks/useProductList";

type Props={

value:string;

onChange:(value:string)=>void;

};

export default function ProductSelect({

value,

onChange,

}:Props){

const{

products,

}=

useProductList();

return(

<select

className="w-full rounded-lg border px-3 py-2"

value={value}

onChange={(e)=>

onChange(e.target.value)

}

>

<option value="">

Select Product

</option>

{products.map(product=>(

<option

key={product.id}

value={product.id}

>

{product.name}

</option>

))}

</select>

);

}