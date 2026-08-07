import type { InventoryProduct } from "../types/InventoryProduct";

type Props={

product:InventoryProduct;

};

export default function ProductRow({

product

}:Props){

return(

<tr className="border-b hover:bg-gray-50">

<td className="p-4">

{product.name}

</td>

<td>

{product.brand}

</td>

<td>

{product.category}

</td>

<td>

{product.quantity}

</td>

<td>

₦{product.price.toLocaleString()}

</td>

</tr>

);

}