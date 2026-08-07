import ProductHeader from "../components/ProductHeader";
import ProductForm from "../components/ProductForm";
import ProductSidebar from "../components/ProductSidebar";

export default function ProductCreatePage(){

return(

<div className="space-y-8">

<ProductHeader/>

<div className="grid lg:grid-cols-3 gap-8">

<div className="lg:col-span-2">

<ProductForm/>

</div>

<ProductSidebar/>

</div>

</div>

);

}