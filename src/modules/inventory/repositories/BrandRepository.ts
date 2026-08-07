import type { Brand } from "../types/Brand";

export interface BrandRepository{

getAll():Promise<Brand[]>;

create(
brand:Brand
):Promise<void>;

}