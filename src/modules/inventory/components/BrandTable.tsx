import { useBrands } from "../hooks/useBrands";

export default function BrandTable(){

const{

brands

}=useBrands();

return(

<table className="min-w-full">

<thead>

<tr>

<th>Name</th>

<th>Country</th>

<th>Website</th>

</tr>

</thead>

<tbody>

{brands.map(brand=>(

<tr key={brand.id}>

<td>{brand.name}</td>

<td>{brand.country}</td>

<td>{brand.website}</td>

</tr>

))}

</tbody>

</table>

);

}