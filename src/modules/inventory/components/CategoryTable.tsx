import { useCategoryStore } from "../store/CategoryStore";

export default function CategoryTable(){

const{

categories

}=useCategoryStore();

return(

<table className="min-w-full">

<thead>

<tr>

<th>Name</th>

<th>Description</th>

</tr>

</thead>

<tbody>

{categories.map(category=>(

<tr key={category.id}>

<td>{category.name}</td>

<td>{category.description}</td>

</tr>

))}

</tbody>

</table>

);

}