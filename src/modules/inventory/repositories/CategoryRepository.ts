import type { Category } from "../types/Category";

export interface CategoryRepository {

  getAll(): Promise<Category[]>;

  create(category: Category): Promise<void>;

}