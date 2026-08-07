import SectionTitle from "../../../components/ui/SectionTitle";

import CategoryGrid
from "../components/CategoryGrid";

import CreateCategoryButton
from "../components/CreateCategoryButton";
import CategoryStatistics from "../components/CategoryStatistics";
export default function CategoryPage(){

return(

<div className="space-y-8">

<SectionTitle

title="Categories"

subtitle="Manage inventory categories."

/>
<CreateCategoryButton />
<CategoryStatistics/>
<CategoryGrid/>

</div>

);

}