import type { Brand } from "../types/Brand";

export function brandName(

brands: Brand[],

id: string

){

return (

brands.find(

b=>b.id===id

)?.name

??

"Unknown"

);

}