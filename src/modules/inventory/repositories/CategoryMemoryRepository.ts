import type { Category } from "../types/Category";
import type { CategoryRepository } from "./CategoryRepository";

export class CategoryMemoryRepository
implements CategoryRepository {

  private categories: Category[] = [];

  async getAll() {

    return this.categories;

  }

  async create(category: Category) {

    this.categories.push(category);

  }

}