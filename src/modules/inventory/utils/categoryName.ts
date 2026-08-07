import type { Category } from "../types/Category";

export function categoryName(

categories: Category[],

id: string

){

return (

categories.find(

c=>c.id===id

)?.name

??

"Unknown"

);

}