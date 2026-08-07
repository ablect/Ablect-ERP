import type { Product } from "../types/Product";

import {
ProductMemoryRepository
}
from "../repositories/ProductMemoryRepository";

const repository =
new ProductMemoryRepository();

export const productService={

async getAll(){

return repository.getAll();

},

async getById(id:string){

return repository.getById(id);

},

async create(product:Product){

await repository.create(product);

return repository.getAll();

},

async update(product:Product){

await repository.update(product);

return repository.getAll();

},

async delete(id:string){

await repository.delete(id);

return repository.getAll();

}

};