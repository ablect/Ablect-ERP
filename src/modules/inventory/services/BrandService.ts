import type { Brand } from "../types/Brand";

import { BrandMemoryRepository }
from "../repositories/BrandMemoryRepository";

const repository =
new BrandMemoryRepository();

export const brandService = {

  async getAll() {

    return repository.getAll();

  },

  async create(
    brand: Brand
  ) {

    await repository.create(brand);

    return repository.getAll();

  }

};