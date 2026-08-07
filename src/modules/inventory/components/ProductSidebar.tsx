import ProductIdentity from "./ProductIdentity";
import ProductStatus from "./ProductStatus";
import ProductValidationSummary from "./ProductValidationSummary";

export default function ProductSidebar(){

return(

<div className="space-y-6">
<ProductValidationSummary />

<ProductStatus />

<ProductIdentity />
<ProductStatus/>

<ProductIdentity/>

</div>

);

}