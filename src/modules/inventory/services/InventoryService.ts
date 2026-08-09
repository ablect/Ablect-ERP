import type { InventoryItem } from "../types/InventoryItem";

function api() {
  if (!window.ablectDesktop?.erp?.products) throw new Error("Desktop data bridge is unavailable.");
  return window.ablectDesktop.erp.products;
}

export const inventoryService = {
  async getAll(): Promise<InventoryItem[]> {
    return (await api().list()) as InventoryItem[];
  },
  async create(item: InventoryItem): Promise<InventoryItem[]> {
    return (await api().create(item)) as InventoryItem[];
  },
  async update(item: InventoryItem): Promise<InventoryItem[]> {
    return (await api().update(item)) as InventoryItem[];
  },
  async delete(id: string): Promise<InventoryItem[]> {
    return (await api().delete(id)) as InventoryItem[];
  },
  async receiveStock(productId: string, quantity: number): Promise<InventoryItem[]> {
    if (quantity <= 0) throw new Error("Stock quantity must be greater than zero.");
    const items = await this.getAll();
    const product = items.find((item) => item.id === productId);
    if (!product) throw new Error("Product not found in inventory.");
    return this.update({ ...product, quantity: product.quantity + quantity });
  },
  async issueStock(productId: string, quantity: number): Promise<InventoryItem[]> {
    if (quantity <= 0) throw new Error("Stock quantity must be greater than zero.");
    const items = await this.getAll();
    const product = items.find((item) => item.id === productId);
    if (!product) throw new Error("Product not found in inventory.");
    if (product.quantity < quantity) throw new Error(`Insufficient stock for ${product.itemName}. Available: ${product.quantity}.`);
    return this.update({ ...product, quantity: product.quantity - quantity });
  },
};
