import Card from "../../../components/ui/Card";

import type { Product } from "../types/Product";

type Props={

product:Product;

};

export default function ProductDetailsCard({

product

}:Props){

return(

<Card>

<h2 className="text-xl font-bold">

{product.name}

</h2>

<p>

SKU: {product.sku}

</p>

<p>

Barcode: {product.barcode}

</p>

<p>

Stock: {product.quantity}

</p>

</Card>

);

}