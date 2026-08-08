import type {
  InventoryItem,
} from "../types/InventoryItem";

let items: InventoryItem[] = [];

function getStockStatus(
  quantity: number,
  reorderLevel: number,
): InventoryItem["status"] {
  if (quantity <= 0) {
    return "Out of Stock";
  }

  if (quantity <= reorderLevel) {
    return "Low Stock";
  }

  return "In Stock";
}

export const inventoryService = {
  async getAll(): Promise<InventoryItem[]> {
    return [...items];
  },

  async create(
    item: InventoryItem,
  ): Promise<InventoryItem[]> {
    items = [
      ...items,
      item,
    ];

    return [...items];
  },

  async update(
    updated: InventoryItem,
  ): Promise<InventoryItem[]> {
    items = items.map((item) =>
      item.id === updated.id
        ? updated
        : item,
    );

    return [...items];
  },

  async delete(
    id: string,
  ): Promise<InventoryItem[]> {
    items = items.filter(
      (item) => item.id !== id,
    );

    return [...items];
  },

  async receiveStock(
    productId: string,
    quantity: number,
  ): Promise<InventoryItem[]> {
    if (quantity <= 0) {
      throw new Error(
        "Stock quantity must be greater than zero.",
      );
    }

    const product = items.find(
      (item) => item.id === productId,
    );

    if (!product) {
      throw new Error(
        "Product not found in inventory.",
      );
    }

    items = items.map((item) => {
      if (item.id !== productId) {
        return item;
      }

      const newQuantity =
        item.quantity + quantity;

      return {
        ...item,
        quantity: newQuantity,
        status: getStockStatus(
          newQuantity,
          item.reorderLevel,
        ),
      };
    });

    return [...items];
  },

  async issueStock(
    productId: string,
    quantity: number,
  ): Promise<InventoryItem[]> {
    if (quantity <= 0) {
      throw new Error(
        "Stock quantity must be greater than zero.",
      );
    }

    const product = items.find(
      (item) => item.id === productId,
    );

    if (!product) {
      throw new Error(
        "Product not found in inventory.",
      );
    }

    if (product.quantity < quantity) {
      throw new Error(
        `Insufficient stock for ${product.itemName}. Available: ${product.quantity}.`,
      );
    }

    items = items.map((item) => {
      if (item.id !== productId) {
        return item;
      }

      const newQuantity =
        item.quantity - quantity;

      return {
        ...item,
        quantity: newQuantity,
        status: getStockStatus(
          newQuantity,
          item.reorderLevel,
        ),
      };
    });

    return [...items];
  },
};