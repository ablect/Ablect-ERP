import Card from "../../../components/ui/Card";

import type { Category }
from "../types/Category";

type Props={

category:Category;

};

export default function CategoryCard({

category

}:Props){

return(

<Card>

<h3 className="font-semibold">

{category.name}

</h3>

<p className="mt-2 text-slate-500">

{category.description}

</p>

</Card>

);

}