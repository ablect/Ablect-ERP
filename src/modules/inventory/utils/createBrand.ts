import { v4 as uuid } from "uuid";

import type { Brand } from "../types/Brand";

export function createBrand(

name:string,

country:string,

website:string

):Brand{

return{

id:uuid(),

name,

country,

website,

createdAt:new Date()

};

}