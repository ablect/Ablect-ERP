import { useCategories }
from "../hooks/useCategories";

import CategoryCard
from "./CategoryCard";

export default function CategoryGrid(){

const{

categories

}=useCategories();

return(

<div className="grid gap-6 md:grid-cols-3">

{categories.map(category=>(

<CategoryCard

key={category.id}

category={category}

/>

))}

</div>

);

}