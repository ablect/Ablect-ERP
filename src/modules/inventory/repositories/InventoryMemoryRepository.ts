import type { InventoryRepository } from "./InventoryRepository";
import type { InventoryProduct } from "../types/InventoryProduct";

export class InventoryMemoryRepository
  implements InventoryRepository {

  private products: InventoryProduct[] = [];

  async getAll() {
    return this.products;
  }

  async getById(id: string) {
    return this.products.find(p => p.id === id) ?? null;
  }

  async create(product: InventoryProduct) {
    this.products.push(product);
  }

  async update(product: InventoryProduct) {

    this.products = this.products.map(p =>
      p.id === product.id ? product : p
    );

  }

  async delete(id: string) {

    this.products = this.products.filter(
      p => p.id !== id
    );

  }

}