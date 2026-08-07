import ProductHeader from "../components/ProductHeader";

import ProductTable from "../components/ProductTable";

import { demoProducts } from "../services/productService";

export default function ProductPage(){

return(

<div className="space-y-6">

<ProductHeader/>

<ProductTable

products={demoProducts}

/>

</div>

);

}