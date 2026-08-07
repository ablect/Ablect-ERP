import type { Category } from "../types/Category";

import {
CategoryMemoryRepository
}
from "../repositories/CategoryMemoryRepository";

const repository =
new CategoryMemoryRepository();

export const categoryService={

  getAll(){

    return repository.getAll();

  },

  create(category:Category){

    return repository.create(category);

  }

};