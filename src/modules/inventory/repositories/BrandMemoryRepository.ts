import type { Brand } from "../types/Brand";
import type { BrandRepository } from "./BrandRepository";

export class BrandMemoryRepository
implements BrandRepository{

private brands:Brand[]=[];

async getAll(){

return this.brands;

}

async create(

brand:Brand

){

this.brands.push(brand);

}

}