import SectionTitle from "../../../components/ui/SectionTitle";

import CategoryTable
from "../components/CategoryTable";

export default function CategoryPage(){

return(

<div className="space-y-8">

<SectionTitle

title="Categories"

subtitle="Manage inventory categories."

/>

<CategoryTable/>

</div>

);

}