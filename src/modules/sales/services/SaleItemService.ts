import type { SaleItem } from "../types/SaleItem";

let items: SaleItem[] = [];

export const saleItemService = {
  async getAll(): Promise<SaleItem[]> {
    return [...items];
  },

  async getById(
    id: string,
  ): Promise<SaleItem | undefined> {
    return items.find(
      (item) => item.id === id,
    );
  },

  async getBySaleId(
    saleId: string,
  ): Promise<SaleItem[]> {
    return items.filter(
      (item) => item.saleId === saleId,
    );
  },

  async create(
    item: SaleItem,
  ): Promise<SaleItem> {
    const exists = items.some(
      (existing) =>
        existing.id === item.id,
    );

    if (exists) {
      throw new Error(
        "Sale item already exists.",
      );
    }

    items = [
      ...items,
      item,
    ];

    return item;
  },

  async createMany(
    saleItems: SaleItem[],
  ): Promise<SaleItem[]> {
    if (saleItems.length === 0) {
      return [];
    }

    const existingIds =
      new Set(
        items.map(
          (item) => item.id,
        ),
      );

    const duplicate =
      saleItems.find(
        (item) =>
          existingIds.has(item.id),
      );

    if (duplicate) {
      throw new Error(
        `Sale item "${duplicate.id}" already exists.`,
      );
    }

    items = [
      ...items,
      ...saleItems,
    ];

    return [...saleItems];
  },

  async update(
    updated: SaleItem,
  ): Promise<SaleItem> {
    const exists = items.some(
      (item) =>
        item.id === updated.id,
    );

    if (!exists) {
      throw new Error(
        "Sale item not found.",
      );
    }

    items = items.map(
      (item) =>
        item.id === updated.id
          ? updated
          : item,
    );

    return updated;
  },

  async delete(
    id: string,
  ): Promise<void> {
    const exists = items.some(
      (item) =>
        item.id === id,
    );

    if (!exists) {
      throw new Error(
        "Sale item not found.",
      );
    }

    items = items.filter(
      (item) =>
        item.id !== id,
    );
  },

  async deleteBySaleId(
    saleId: string,
  ): Promise<void> {
    items = items.filter(
      (item) =>
        item.saleId !== saleId,
    );
  },
};