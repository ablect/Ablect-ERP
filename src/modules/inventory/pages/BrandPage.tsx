import SectionTitle from "../../../components/ui/SectionTitle";

import BrandTable from "../components/BrandTable";

export default function BrandPage(){

return(

<div className="space-y-8">

<SectionTitle

title="Brands"

subtitle="Manage product brands."

/>

<BrandTable/>

</div>

);

}