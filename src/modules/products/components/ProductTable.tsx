import type { Product } from "../types/product";

type Props={

products:Product[];

};

export default function ProductTable({

products

}:Props){

return(

<div className="bg-white rounded-2xl shadow overflow-hidden">

<table className="w-full">

<thead>

<tr>

<th>Barcode</th>

<th>SKU</th>

<th>Name</th>

<th>Category</th>

<th>Brand</th>

<th>Qty</th>

<th>Cost</th>

<th>Selling</th>

</tr>

</thead>

<tbody>

{

products.map(product=>(

<tr key={product.id}>

<td>{product.barcode}</td>

<td>{product.sku}</td>

<td>{product.name}</td>

<td>{product.category}</td>

<td>{product.brand}</td>

<td>{product.quantity}</td>

<td>₦{product.costPrice.toLocaleString()}</td>

<td>₦{product.sellingPrice.toLocaleString()}</td>

</tr>

))

}

</tbody>

</table>

</div>

);

}