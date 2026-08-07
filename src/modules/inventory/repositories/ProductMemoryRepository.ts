import type { Product } from "../types/Product";
import type { ProductRepository } from "./ProductRepository";

export class ProductMemoryRepository
implements ProductRepository {

  private products: Product[] = [];

  async getAll() {
    return this.products;
  }

  async getById(id: string) {
    return this.products.find(
      p => p.id === id
    ) ?? null;
  }

  async create(product: Product) {
    this.products.push(product);
  }

  async update(product: Product) {

    this.products =
      this.products.map(p =>
        p.id === product.id
          ? product
          : p
      );

  }

  async delete(id: string) {

    this.products =
      this.products.filter(
        p => p.id !== id
      );

  }

}