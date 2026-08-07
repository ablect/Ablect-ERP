import { v4 as uuid } from "uuid";

import type { Category }
from "../types/Category";

export function createCategory(

name:string,

description:string

):Category{

return{

id:uuid(),

name,

description,

createdAt:new Date()

};

}